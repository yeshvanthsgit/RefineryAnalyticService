package com.analytic.util;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class InputDataHandler {

	public static void devideEachExcel(MultipartFile convFile) {
					try(InputStream input = convFile.getInputStream();) {
						
						//Create Workbook instance for xlsx/xls file input stream
						Workbook workbook = null;

						//Dataformatter for the excel
						DataFormatter formatter = new DataFormatter();
						
						if(convFile.getOriginalFilename().toLowerCase().endsWith("xlsx")){
							workbook = new XSSFWorkbook(input);
						}else if(convFile.getOriginalFilename().toLowerCase().endsWith("xls")){
							workbook = new HSSFWorkbook(input);
						}

						
						
						for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
							Sheet sheet = workbook.getSheetAt(i);
							
							System.out.println(sheet.getSheetName());
							
							try(PrintWriter out = new PrintWriter(new FileOutputStream(sheet.getSheetName()+".csv"), true);){
								
								//Excel needs the Byte-Order-Marker to indicate that the file is encoded in UTF-8.
								/*byte[] bom = {(byte)0xEF, (byte)0xBB, (byte)0xBF};
								out.write(bom);*/
								
								for (int r = 0, rn = sheet.getLastRowNum() ; r <= rn ; r++) {
									
							        Row row = sheet.getRow(r);
							        
							        if ( row == null ) {
							        	out.println(',');
							        	continue; 
							        }
							        
							        if(checkEmptyRow(row, formatter)) {
							        	continue; 
							        }
							        
							        //To avoid COMMA being appended
							        boolean firstCell = true;
							        
							        for (int c = 0, cn = row.getLastCellNum() ; c < cn ; c++) {
							        	
							            Cell cell = row.getCell(c, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
							            
							            if ( !firstCell){
							            	out.print(',');
							            }
							            if ( cell != null ) {
							                String value = formatter.formatCellValue(cell);
							                if ( cell.getCellTypeEnum() == CellType.FORMULA ) {
							                    value = "=" + value;
							                }
							                out.print(encodeValue(value));
							            }
							            
							            firstCell = false;
							        }
							        
							        out.println();
							    }
								
							} catch(Exception e){
								e.printStackTrace();
							}
							
						}
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				

			
	}
	

	private static boolean checkEmptyRow(Row row, DataFormatter formatter) {
		
		int emptyCellCount = 0;
		
		int rowLength = row.getLastCellNum();
		
		for (int c = 0, cn = row.getLastCellNum() ; c < cn ; c++) {
        	
            Cell cell = row.getCell(c, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
            
            if ( cell == null ) {
				emptyCellCount++;
            }
        }
		
		if(emptyCellCount == rowLength) {
			return true;
		}else {
			return false;
		}
	}


	static private Pattern rxquote = Pattern.compile("\"");

	static private String encodeValue(String value) {
		boolean needQuotes = false;
		if (value.indexOf(',') != -1 || value.indexOf('"') != -1
				|| value.indexOf('\n') != -1 || value.indexOf('\r') != -1)
			needQuotes = true;
		Matcher m = rxquote.matcher(value);
		if (m.find())
			needQuotes = true;
		value = m.replaceAll("\"\"");
		if (needQuotes)
			return "\"" + value + "\"";
		else
			return value;
	}
	
	public static void devideExcel(MultipartFile trainFile, MultipartFile testFile) {
	devideEachExcel(testFile);
	devideEachExcel(trainFile);
		
	}
}
