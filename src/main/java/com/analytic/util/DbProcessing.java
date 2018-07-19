package com.analytic.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.analytic.dao.RefineryDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

public class DbProcessing {
	public static void saveAndDevideFiles() {
		String trainRefinaryCSV = "Train_Refinery.csv";
		String trainRegionCSV = "Train_Region.csv";
		String trainSiteCSV = "Train_Site.csv";
		String testRefinaryCSV = "Test_Refinery.csv";
		String testRegionCSV = "Test_Region.csv";
		String testSiteCSV = "Test_Site.csv";

		
		File input = new File(trainRefinaryCSV);
		File output = new File("trainRefinary.json");
		
		convertArffToJson(input,output);
		saveDataintoDb(output,"TrainDB","Refinary");
		
		File input1 = new File(trainRegionCSV);
		File output1 = new File("trainRegion.json");
		convertArffToJson(input1,output1);
		saveDataintoDb(output1,"TrainDB","Region");
		
		File input2 = new File(trainSiteCSV);
		File output2 = new File("trainSite.json");
		convertArffToJson(input2,output2);
		saveDataintoDb(output2,"TrainDB","Site");
		
		File input3 = new File(testRefinaryCSV);
		File output3 = new File("testRefinary.json");
		convertArffToJson(input3,output3);
		saveDataintoDb(output3,"TestDB","Refinary");
		
		File input4 = new File(testRegionCSV);
		File output4 = new File("testRegion.json");
		convertArffToJson(input4,output4);
		saveDataintoDb(output4,"TestDB","Region");
		
		File input5 = new File(testSiteCSV);
		File output5 = new File("testSite.json");
		convertArffToJson(input5,output5);
		saveDataintoDb(output5,"TestDB","Site");
		
		RefineryDAO.deleteRecord("TRAINDB", "Refinarycoll", "Refinery_Name", "");
		RefineryDAO.deleteRecord("TRAINDB", "Regioncoll", "Region_Name", "");
		RefineryDAO.deleteRecord("TRAINDB", "Sitecoll", "Site_Name", "");
		
		RefineryDAO.deleteRecord("TRAINDB", "Refinarycoll", "Refinery_Name", "N/A");
		RefineryDAO.deleteRecord("TRAINDB", "Regioncoll", "Region_Name", "N/A");
		RefineryDAO.deleteRecord("TRAINDB", "Sitecoll", "Site_Name", "N/A");
		
		RefineryDAO.deleteRecord("TESTDB", "Refinarycoll", "Refinery_Name", "");
		RefineryDAO.deleteRecord("TESTDB", "Regioncoll", "Region_Name", "");
		RefineryDAO.deleteRecord("TESTDB", "Sitecoll", "Site_Name", "");
		
		RefineryDAO.deleteRecord("TESTDB", "Refinarycoll", "Refinery_Name", "N/A");
		RefineryDAO.deleteRecord("TESTDB", "Regioncoll", "Region_Name", "N/A");
		RefineryDAO.deleteRecord("TESTDB", "Sitecoll", "Site_Name", "N/A");
		
		
		
	}



	private static void saveDataintoDb(File fileoutput, String dbName, String type) {
		try {
			FileInputStream fis = new FileInputStream(fileoutput);
			RefineryDAO.saveData(fis, dbName,type);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}



	private static void convertArffToJson(File resultinput, File resultoutput) {
		CsvSchema csvSchema = CsvSchema.builder().setUseHeader(true).build();
		CsvMapper csvMapper = new CsvMapper();
		ObjectMapper mapper = new ObjectMapper();
		try {
			List<Object> readAll = csvMapper.readerFor(Map.class).with(csvSchema).readValues(resultinput).readAll();
			mapper.writerWithDefaultPrettyPrinter().writeValue(resultoutput, readAll);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
	}

	
}
