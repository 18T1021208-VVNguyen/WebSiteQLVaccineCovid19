package com.brycen.vn.config;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtils {

    public static String getUserName() {
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	String username =null;
    	if (principal instanceof UserDetails) {
    	   username = ((UserDetails)principal).getUsername();
    	} else {
    	   username = principal.toString();
    	}
    	return username;
    }
}