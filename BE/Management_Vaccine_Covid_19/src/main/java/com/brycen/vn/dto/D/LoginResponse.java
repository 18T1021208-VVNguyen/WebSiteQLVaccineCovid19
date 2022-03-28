package com.brycen.vn.dto.D;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
  private String token;
  private List<String> roles;
  private Long idUser;
  private String userName;
  private Long idCustomer ; 
  private String customerName;
}