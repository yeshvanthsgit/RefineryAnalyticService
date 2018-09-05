package com.analytic.controller;

import java.text.ParseException;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.analytic.service.RefineryService;
import com.analytic.util.JSendWrapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@RestController
@RequestMapping("/refinery")
@CrossOrigin("*")
public class RefineryController {

	@Autowired
	RefineryService refineryService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<JSendWrapper> test() throws Exception {

		return JSendWrapper.ok("abc");
	}

	@RequestMapping("/fetchData/{level}/{type}")
	@GET
	public ResponseEntity<Object> fetchData(@PathVariable String level,@PathVariable String type) {
		
		String jsonData =  null;
				try {
					jsonData = refineryService.fetchData(level, type);
				}
				catch(Exception e){
					jsonData = null;
				}
		
		if(null != jsonData){
			return new ResponseEntity<Object>(jsonData, HttpStatus.OK);
		}
		
		else {
			return new ResponseEntity<Object>(jsonData, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping( method=RequestMethod.POST,value="/saveData")
	public ResponseEntity<Object> saveData(@RequestParam("file1") MultipartFile testfile,@RequestParam("file2") MultipartFile trainfile) {
		
		String status =  null;
		try {
			status = refineryService.saveData(testfile,trainfile);
			System.out.println("Status after uploading::"+status);
		}
		catch(ParseException e){
			status = e.getMessage();
			System.out.println("Error while uploading::"+e.getMessage());
		}
		catch(Exception e){
			status = null;
			System.out.println("Error while uploading::"+e.getMessage());
		}
		
		if (null != status) {
			if (status.contains("InvalidFile")) {
				JsonArray jsonArr = new JsonArray();
				jsonArr.add("errorMessage");
				jsonArr.add(status);
				System.out.println(jsonArr.toString());
				return new ResponseEntity<Object>(jsonArr.toString(), HttpStatus.NOT_ACCEPTABLE);
			}
			return new ResponseEntity<Object>(status, HttpStatus.OK);
		}		
		else {
			return new ResponseEntity<Object>(status, HttpStatus.BAD_REQUEST);
		}
		
		//return JSendWrapper.ok(refineryService.saveData(testfile,trainfile));
		
	}
	
/*	@RequestMapping( method=RequestMethod.POST,value="/saveData2")
	@POST
	public ResponseEntity<JSendWrapper> saveData(@RequestParam("file1") String testFilePath, @RequestParam("file2") String trainFilePath) throws Exception {
		return JSendWrapper.ok(refineryService.saveData(testFilePath, trainFilePath));
	}*/

	
	@RequestMapping("/fetchRecord/{level}/{type}/{columnName}/{columnValue}")
	@GET
	public ResponseEntity<Object> fetchRecord(@PathVariable String level,@PathVariable String type,@PathVariable String columnName,@PathVariable String columnValue) {
		
		String jsonData = null;
		try {
		jsonData =  refineryService.fetchRecord(level, type, columnName,columnValue);
		}
		 catch(Exception e){
			 jsonData =  null;
		 }
		
		if(null != jsonData){
			return new ResponseEntity<Object>(jsonData, HttpStatus.OK);
		}
		
		else {
			return new ResponseEntity<Object>(jsonData, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping("/updateRecord/{level}/{type}/{keyName}/{keyValue}/{columnName}/{columnValue}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseEntity<JSendWrapper> updateRecord(@PathVariable String level,@PathVariable String type,@PathVariable String keyName,@PathVariable String keyValue,@PathVariable String columnName,@PathVariable String columnValue) throws Exception {

		return JSendWrapper.ok(refineryService.updateRecord(level, type,keyName,keyValue,columnName,columnValue));
	}
	
	
	
	
	@RequestMapping("/updateRecord/{level}/{type}")
	@POST
	public ResponseEntity<Object> updateRecord(@PathVariable String level, @PathVariable String type, @RequestBody String data){
		
		String status = null;
		try {
		JsonParser parser = new JsonParser();
		JsonElement json = parser.parse(data);
		JsonObject refineryData = json.getAsJsonObject();
		refineryData.remove("_id");
		status = refineryService.updateRecord(level, type,refineryData);
		}
		
		catch(Exception e){
			status = null;
		}
		
		if(null != status){
			return new ResponseEntity<Object>(status, HttpStatus.OK);
		}
		
		else {
			return new ResponseEntity<Object>(status, HttpStatus.BAD_REQUEST);
		}

	}

	@RequestMapping(method=RequestMethod.POST,value="/updateData/{level}/{type}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public ResponseEntity<JSendWrapper> updateData(@PathVariable String level,@PathVariable String type,@RequestParam("file") MultipartFile path) throws Exception {
	
		return JSendWrapper.ok(refineryService.updateData(level, type,path));
	}
	
	@RequestMapping("/deleteData/{level}/{type}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteData(@PathVariable String level,@PathVariable String type) throws Exception {

		return refineryService.deleteData(level, type);
	}
	
	@RequestMapping("/deleteRecord/{level}/{type}/{keyName}/{keyValue}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String deleteRecord(@PathVariable String level,@PathVariable String type,@PathVariable String keyName,@PathVariable String keyValue) throws Exception {

		return refineryService.deleteRecord(level, type,keyName,keyValue);
	}

	//new methods
	
		@RequestMapping("/fetchSiteDataAttachedToRegion/{regionValue}")
		@GET
		public String fetchSiteDataAttachedToRegion(@PathVariable String regionValue) throws Exception {
			
			
			return refineryService.fetchSiteDataAttachedToRegion(regionValue);
		}
		
		@RequestMapping("/fetchRefinaryDataAttachedToRegion/{regionValue}")
		@GET
		public String fetchRefinaryDataAttachedToRegion(@PathVariable String regionValue) throws Exception {
			
			
			return refineryService.fetchRefinaryDataAttachedToRegion(regionValue);
		}
		
		@RequestMapping("/fetchRefinaryDataAttachedToSite/{siteValue}")
		@GET
		public String fetchRefinaryDataAttachedToSite(@PathVariable String siteValue) throws Exception {
			
			
			return refineryService.fetchRefinaryDataAttachedToSite(siteValue);
		}
		
		@RequestMapping("/fetchAttributes/{level}/{type}/{columnValue}")
		@GET
		public String fetchAttributes(@PathVariable String level,@PathVariable String type,@PathVariable String columnValue) throws Exception {
			
			
			return refineryService.fetchAttributes(level,type,columnValue);
		}
		
		
		@RequestMapping( method=RequestMethod.POST,value="/saveRefinary/{level}/{type}")
		@POST
		public ResponseEntity<JSendWrapper> saveRefinary(@PathVariable String level,@PathVariable String type,@RequestBody String payload) throws Exception {
			
			return JSendWrapper.ok(refineryService.saveRefinary(level,type,payload));
			
		}
		
		@RequestMapping("/fetchLimiteFields/{level}/{type}")
		@GET
		public String fetchLimiteFields(@PathVariable String level,@PathVariable String type) throws Exception {
			
			
			return refineryService.fetchLimiteFields(level,type);
		}

		@RequestMapping("/deleteDb/{level}")
		@DELETE
		@Produces(MediaType.APPLICATION_JSON)
		public String deleteDb(@PathVariable String level) throws Exception {

			return refineryService.deleteDb(level);
		}
		
		@RequestMapping("/getKeys/{level}/{type}")
		@GET
		public List<String> getKeys(@PathVariable String level,@PathVariable String type) throws Exception{
			return refineryService.getKeys(level,type);

		}
	

}
