package com.analytic.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

import org.apache.commons.io.IOUtils;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.analytic.util.DbProcessing;
import com.analytic.util.InputDataHandler;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;
@Repository
public class RefineryDAO {
	private static Mongo mongo = null;

	static {
	String attributePath = "Attributes.properties";
	Properties prop = new Properties();
	try {
		
		InputStream	inputT = new FileInputStream(attributePath);
		prop.load(inputT);
		 mongo = new Mongo(prop.getProperty("MONGOHOST"), 27017);

	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
	private static DBCollection collection = null;
	
	private static  DB db = null;
	
public static DB getDb(String dbName) {
		

	
		if("TrainDB".equals(dbName)){
			 db = mongo.getDB("TRAINDB");
			 
		}else if("TestDB".equals(dbName)){
			
			 db = mongo.getDB("TESTDB");
			
		}
		return db;
	}
	public static DBCollection fetchCollection(String dbName, String type) {
		if("TrainDB".equals(dbName)){
			 db = mongo.getDB("TRAINDB");
			 if(type.equals("Refinary")) {
				 collection = db.getCollection("RefinaryCollection");
			 }else if(type.equals("Region")) {
				 collection = db.getCollection("RegionCollection");
			 }else if(type.equals("Site")){
				 collection = db.getCollection("SiteCollection");
			}
		}else if("TestDB".equals(dbName)){
			
			 db = mongo.getDB("TESTDB");
			 
			 if(type.equals("Refinary")) {
				 collection = db.getCollection("RefinaryCollection");
			 }else if(type.equals("Region")) {
				 collection = db.getCollection("RegionCollection");
			 }else if(type.equals("Site")){
				 collection = db.getCollection("SiteCollection");
			}
			 
		
		}
		
		return collection;
	}
	
	
	

	

	
	public static String deleteData(String dbName,String type){

		  db= getDb(dbName);
		 collection = fetchCollection(dbName,type);
         collection.drop();
		 String data ="Data Deleted for "+ type +"in "+dbName  +"!";
		  
		  return data;
		

		
	}
	
	public static String deleteRecord(String level, String type, String keyName, String keyValue) {
		db= getDb(level);
		 collection = fetchCollection(level,type);
			BasicDBObject document = new BasicDBObject();
			document.put(keyName, keyValue);
			collection.remove(document);

			String data ="Dcouement Deleted with"+ keyName +"and" +keyValue;
		  
		  return data;
	}
	

	
	public static void saveData(FileInputStream fis,String dbName ,String type) {
			db= getDb(dbName);
			collection = fetchCollection(dbName,type);
			deleteData(dbName,type);
		String genreJson;
		try {
			genreJson = IOUtils.toString(fis, Charset.defaultCharset());
			 JSONArray jsonArray = new JSONArray(genreJson);
		        
		        for (int i = 0; i < jsonArray.length(); i++) {
		        	
		            JSONObject jsonObject = (JSONObject) jsonArray.get(i);
		            DBObject bson = (DBObject) JSON.parse(jsonObject.toString());
		            WriteResult insert = collection.insert(bson);
		            System.out.println(insert);

				}
		        
		        fetchAllRecordsInCollections(dbName,type);
		       
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	public String fetchData(String level, String type) throws JSONException {
		JSONArray jsonarray = null;
		if(level !=null && !level.equals("")) {
			if(type != null) {
				 jsonarray = fetchAllRecordsInCollections(level,type);
				
			} else {
				
				jsonarray = fetchAllRecordsIndbs(level);
				
			}
		}
		return jsonarray.toString();
	}

	private JSONArray fetchAllRecordsIndbs(String level) throws JSONException {
		
		DB db = getDb(level);
 
		Set<String> collections = db.getCollectionNames();
		  JSONArray jsonarray = new JSONArray();

		for (String collectionName : collections) {
				System.out.println(collectionName);
				collection = fetchCollection(level,collectionName);
				DBCursor cursor1 = collection.find();
				while(cursor1.hasNext()) {
					
					DBObject result = cursor1.next();
					
					JSONObject output = new JSONObject(JSON.serialize(result));
					System.out.println(output);
					jsonarray.put(output);

				}
		}
		return jsonarray;
		
		
		
		
		
	}
	public static JSONArray fetchAllRecordsInCollections(String dbName,String type) throws JSONException{
		db= getDb(dbName);
		collection = fetchCollection(dbName,type);
		  JSONArray jsonarray = new JSONArray();

		DBCursor cursor1 = collection.find();
		while(cursor1.hasNext()) {
			
			DBObject result = cursor1.next();
			
			JSONObject output = new JSONObject(JSON.serialize(result));
			System.out.println(output);
			jsonarray.put(output);

		}
		return jsonarray;
	}
	
	public static String  fetchBasedOnCriteria(String level,String type, String columnName, String columnValue) throws JSONException{
		
		  JSONArray jsonarray = new JSONArray();
		collection = fetchCollection(level,type);
		
		DBObject neQuery = new BasicDBObject();
		//neQuery.put(columnName, Pattern.compile(columnValue, Pattern.CASE_INSENSITIVE));
		neQuery.put(columnName, columnValue);
		DBCursor cursor = collection.find(neQuery);
		while (cursor.hasNext()) {
			DBObject result =  cursor.next();
			JSONObject output = new JSONObject(JSON.serialize(result));
			System.out.println(output);
			jsonarray.put(output);
		}
		return jsonarray.toString();
	}
	
	
	public String fetchRecord(String level, String type, String columnName, String columnValue) throws JSONException {
			
	/*	try {*/
			return fetchBasedOnCriteria(level,type,columnName,columnValue);
/*		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;*/
		
		
	}

	public String updateRecord(String level, String type, String keyName,String keyValue,String columnName, String columnValue) throws Exception {
		db= getDb(level);
		collection = fetchCollection(level,type);
		
		BasicDBObject newDocument = new BasicDBObject();
		newDocument.append("$set", new BasicDBObject().append(columnName, columnValue));
		BasicDBObject searchQuery = new BasicDBObject().append(keyName, keyValue);
		collection.updateMulti(searchQuery, newDocument);
		/*collection.update(searchQuery, newDocument, false, true);*/
		String msg= "Record Updated!";
	return msg;			
	  
	}
	
	
	public String updateRecord(String level, String type, JsonObject refineryData) throws Exception {
		db= getDb(level);
		collection = fetchCollection(level,type);
		
		DBObject newDocument = new BasicDBObject();
		String id = (String)refineryData.get("id").getAsString();
		
		for(Map.Entry<String,JsonElement> entry : refineryData.entrySet()){

			if(!("id".equalsIgnoreCase(entry.getKey()))){
				((BasicDBObject) newDocument).append(entry.getKey(), entry.getValue().getAsString());
			}
		}
		
		DBObject updateOperationDocument = new BasicDBObject("$set", newDocument);
		
		collection.updateMulti(new BasicDBObject("_id", new ObjectId(id)), updateOperationDocument);
		return "success";			
	  
	}
	

	public String updateData(String level, String type, FileInputStream fis2) throws FileNotFoundException {
		db= getDb(level);
		collection = fetchCollection(level,type);
		
		saveData(fis2, level,type);
		String msg= "Record Updated!";
		return msg;
	}

	public String saveExcels(MultipartFile testfile, MultipartFile trainfile) {
		
	   /* File testFile = new File( testfile.getOriginalFilename());
	    File trainFile = new File( trainfile.getOriginalFilename());*/

		InputDataHandler.devideExcel(trainfile,testfile);
		DbProcessing.saveAndDevideFiles();
			
		return "success";
	}
	
	

/*	public String saveExcels(String testPath, String trainPath) {
		
	    File testFile = new File( testPath);
	    File trainFile = new File( trainPath);

		InputDataHandler.devideExcel(trainFile, testFile);
		DbProcessing.saveAndDevideFiles();
		
			
		return "success";
	}*/

}
