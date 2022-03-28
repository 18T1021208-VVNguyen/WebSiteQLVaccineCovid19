package com.brycen.vn.rest;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.brycen.vn.security.service.JwtService;
import com.brycen.vn.security.service.UserDetailsServiceImpl;
import com.brycen.vn.service.iml.D.UserService;



public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

	private final static String TOKEN_HEADER = "Authorization";

	@Autowired
	private JwtService jwtService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
//	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String authToken =  httpRequest.getHeader(TOKEN_HEADER);
			
		if (jwtService.validateTokenLogin(authToken)) {
			String username = jwtService.getUsernameFromToken(authToken);
		
			com.brycen.vn.entity.User user = userService.loadUserByUsername(username);
			if (user != null) {
				UserDetails userDetail =  userDetailsServiceImpl.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetail,
						null, userDetail.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}

		chain.doFilter(request, response);
	}
//	private String parseJwt(HttpServletRequest request) {
//		String headerAuth = request.getHeader(TOKEN_HEADER); // laays header ten Authorization
//		// null ,"" ," " . false
//		if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ") )
//		{
//			return headerAuth.substring(7, headerAuth.length());
//		}
//		return null;
//	}
}