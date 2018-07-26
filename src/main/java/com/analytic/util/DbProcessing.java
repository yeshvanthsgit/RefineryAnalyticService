package com.analytic.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.analytic.dao.RefineryDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

public class DbProcessing {
	
	
	public static void saveAndDevideFiles() {
		
		String attributePath = "Attributes.properties";
		Properties prop = new Properties();
	
		try {
			InputStream	inputT = new FileInputStream(attributePath);
			prop.load(inputT);
		
		
		String trainRefinaryCSV = prop.getProperty("TRAINREFINERY");
		String trainRegionCSV = prop.getProperty("TRAINREGION");
		String trainSiteCSV = prop.getProperty("TRAINSITE");
		String testRefinaryCSV = prop.getProperty("TESTREFINERY");
		String testRegionCSV = prop.getProperty("TESTREGION");
		String testSiteCSV = prop.getProperty("TESTSITE");

		
		File input = new File(trainRefinaryCSV);
		File output = new File(prop.getProperty("TRAINREFINERYJSON"));
		
		convertArffToJson(input,output);
		saveDataintoDb(output,"TrainDB","Refinary");
		
		File input1 = new File(trainRegionCSV);
		File output1 = new File(prop.getProperty("TRAINREGIONJSON"));
		convertArffToJson(input1,output1);
		saveDataintoDb(output1,"TrainDB","Region");
		
		File input2 = new File(trainSiteCSV);
		File output2 = new File(prop.getProperty("TRAINSITEJSON"));
		convertArffToJson(input2,output2);
		saveDataintoDb(output2,"TrainDB","Site");
		
		File input3 = new File(testRefinaryCSV);
		File output3 = new File(prop.getProperty("TESTREFINERYJSON"));
		convertArffToJson(input3,output3);
		saveDataintoDb(output3,"TestDB","Refinary");
		
		File input4 = new File(testRegionCSV);
		File output4 = new File(prop.getProperty("TESTREGIONJSON"));
		convertArffToJson(input4,output4);
		saveDataintoDb(output4,"TestDB","Region");
		
		File input5 = new File(testSiteCSV);
		File output5 = new File(prop.getProperty("TESTSITEJSON"));
		convertArffToJson(input5,output5);
		saveDataintoDb(output5,"TestDB","Site");
		

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
