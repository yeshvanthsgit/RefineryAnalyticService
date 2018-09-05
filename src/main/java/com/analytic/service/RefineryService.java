package com.analytic.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.analytic.dao.RefineryDAO;
import com.google.gson.JsonObject;
@Service
public class RefineryService {

	@Autowired
	RefineryDAO refineryDAO;

	public String fetchData(String level, String type) throws JSONException {
		/*try {*/
			return refineryDAO.fetchData(level, type);
	/*	} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;*/
	}

	public String fetchRecord(String level, String type, String columnName, String columnValue) throws JSONException {
		return refineryDAO.fetchRecord(level, type, columnName,columnValue);
	}

	public String updateRecord(String level, String type,String keyName, String keyValue, String columnName, String columnValue) throws Exception {
		return refineryDAO.updateRecord(level, type,  keyName,keyValue,columnName,columnValue);
	}
	
	
	public String updateRecord(String level, String type,JsonObject refineryData) throws Exception {
		return refineryDAO.updateRecord(level, type, refineryData);
	}

	public String updateData(String level, String type, MultipartFile path) throws Exception {
 		String attributePath = "Attributes.properties";
		Properties prop = new Properties();

		InputStream inputT = new FileInputStream(attributePath);
		prop.load(inputT);
		
		String pathToSave = prop.getProperty("CSV_PATH");
	    File convFile = new File( pathToSave + path.getOriginalFilename());
		FileInputStream fis = new FileInputStream(convFile);

	    
		return refineryDAO.updateData(level, type,fis);
	}

	public String  deleteData(String level, String type) {
		return refineryDAO.deleteData(level, type);
	}

	public String deleteRecord(String level, String type, String keyName, String keyValue) {
		return refineryDAO.deleteRecord(level, type,keyName,keyValue);
		
	}

	public String saveData(MultipartFile testfile, MultipartFile trainfile) throws Exception {
	    /*File convFile = new File(testfile.getOriginalFilename());
		FileInputStream fis = new FileInputStream(convFile);
*/
		return refineryDAO.saveExcels(testfile,trainfile);
	}
	
/*	public String saveData(String testPath, String trainPath) throws FileNotFoundException {
	    File convFile = new File(testPath);
		FileInputStream fis = new FileInputStream(convFile);

		return refineryDAO.saveExcels(testPath, trainPath);
	}*/

	public String fetchSiteDataAttachedToRegion(String regionValue) throws JSONException {
		return refineryDAO.fetchSiteDataAttachedToRegion(regionValue);
	}

	public String fetchRefinaryDataAttachedToRegion(String regionValue) throws JSONException {
		// TODO Auto-generated method stub
		 return refineryDAO.fetchRefinaryDataAttachedToRegion(regionValue);
	}

	public String fetchRefinaryDataAttachedToSite(String siteValue)throws JSONException  {
		// TODO Auto-generated method stub
		return refineryDAO.fetchRefinaryDataAttachedToSite(siteValue);
	}

	public String fetchAttributes(String level, String type, String columnValue) throws JSONException {
		// TODO Auto-generated method stub
		return refineryDAO.fetchAttributes(level,type,columnValue);
	}

	
	public Object saveRefinary(String level, String type, String payload) throws JSONException {
		// TODO Auto-generated method stub
		return refineryDAO.saveRefinary(level,type,payload);

	}

	public String fetchLimiteFields(String level, String type) {
		// TODO Auto-generated method stub
		return refineryDAO.fetchLimiteFields(level,type);

	}

	public String deleteDb(String level) {
		// TODO Auto-generated method stub
		return refineryDAO.deleteDb(level);
	}

	public List<String> getKeys(String level, String type) {
		return refineryDAO.getKeys(level,type);
	}
	
}
