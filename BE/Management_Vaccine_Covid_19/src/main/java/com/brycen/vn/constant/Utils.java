package com.brycen.vn.constant;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.brycen.vn.convert.*;

public class Utils {
	
	public static Date getToday() {
		return new Date();
	}
	
	public static List<Integer> getListNumberInjection(int num){
		List<Integer>  listNum = new ArrayList<>();
		for(int i=1;i<=num;i++)
		{
			listNum.add(i);
		}
		return listNum;
	}
	
	public static Date remove_HH_mm_ss(Date date) throws ParseException {
		String dateText = Convert.dateToString_DD_MM_YYYY(date);
		return Convert.stringToDate_DD_MM_YYYY(dateText);
	}
	
}
