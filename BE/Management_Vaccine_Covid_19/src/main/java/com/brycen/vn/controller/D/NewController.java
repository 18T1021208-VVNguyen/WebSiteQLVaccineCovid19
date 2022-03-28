package com.brycen.vn.controller.D;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.brycen.vn.dto.D.NewDTO;
import com.brycen.vn.service.iml.D.NewServiceImpl;


@RestController
@RequestMapping("/congthongtin")
@CrossOrigin("*")
public class NewController {
	@Autowired
	private NewServiceImpl newServiceImpl;

	// phân trang
	///
	@GetMapping("/news")
		public ResponseEntity<Map<String, Object>> getAllNews(
				@RequestParam(value = "_page") int page,
				@RequestParam(value = "_limit") int size
				) {

			return newServiceImpl.gellAll(page,size);
		}

	
	// xem chi tiết nội dung
	@RequestMapping(value = "/news/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getNewsById(@PathVariable Long id) {
		NewDTO newDTO = newServiceImpl.getNewsById(id);
		if (newDTO != null) {
			return new ResponseEntity<Object>(newDTO, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found New", HttpStatus.NO_CONTENT);
	}

	@PostMapping("/admin/news")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> createNews(@RequestBody NewDTO newDto) {
		newDto.setDeleted(false);
		if (newServiceImpl.save(newDto)) {
			return new ResponseEntity<String>("Create!", HttpStatus.CREATED);
		} else{
			return new ResponseEntity<String>("New update Existed!", HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@PutMapping("/admin/news")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> updateNews(@RequestBody NewDTO newDto) {
		newDto.setDeleted(false);
		if (newServiceImpl.save(newDto)) {
			return new ResponseEntity<String>("update!", HttpStatus.OK);
		} else{
			return new ResponseEntity<String>("New update Existed!", HttpStatus.BAD_REQUEST);
		}
	}

	// admin quan li tin tức
	@GetMapping("/admin/news")
	public ResponseEntity<Map<String, Object>> getAllNewAdmin(
			@RequestParam(value = "_page") int page,
			@RequestParam(value = "_limit") int size
			) {

		return newServiceImpl.gellAll(page,size);
	}

	// admin xóa tin tức
	@DeleteMapping("/admin/news/{id}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> deleteNews(@PathVariable Long id) {
		if (newServiceImpl.deleteNew(id)) {
			return new ResponseEntity<String>("Deleted!", HttpStatus.OK);
		}
		return new ResponseEntity<String>("New Existed!", HttpStatus.BAD_REQUEST);
	}
	//
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@RequestMapping(value = "/admin/news/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getAdminNewsById(@PathVariable Long id) {
		NewDTO newDTO = newServiceImpl.getNewsById(id);
		if (newDTO != null) {
			return new ResponseEntity<Object>(newDTO, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found New", HttpStatus.NO_CONTENT);
	}

}

