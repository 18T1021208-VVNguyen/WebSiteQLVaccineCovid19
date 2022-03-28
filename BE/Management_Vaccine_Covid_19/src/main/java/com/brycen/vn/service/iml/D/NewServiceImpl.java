package com.brycen.vn.service.iml.D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.brycen.vn.dto.D.NewDTO;
import com.brycen.vn.entity.New;
import com.brycen.vn.repositories.D.NewRepository;
import com.brycen.vn.service.D.INewService;



@Service
public class NewServiceImpl implements INewService {

	@Autowired
	private NewRepository newRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ResponseEntity<Map<String, Object>> gellAll(int page,int size) {
		try {
			List<New> listnews = new ArrayList<New>();
			Pageable pageable = PageRequest.of(page - 1, size);
			Page<New> pageTuts = newRepository.findByDeleted(false, pageable);
			listnews = pageTuts.getContent();
			List<NewDTO> listDtos = listnews.stream().map(news -> modelMapper.map(news, NewDTO.class))
					.collect(Collectors.toList());

			Map<String, Object> response = new HashMap<>();
			response.put("_limit", size);
			response.put("_page", page);
			response.put("listnews", listDtos);
			response.put("currentPage", pageTuts.getNumber());
			response.put("totalItems", pageTuts.getTotalElements());
			response.put("totalPages", pageTuts.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Override
	public NewDTO getNewsById(Long id) {
		New news = newRepository.findById(id).get();
		NewDTO newDto = modelMapper.map(news, NewDTO.class);
		return newDto;
	}

	@Override
	public boolean save(NewDTO newDto) {
		if (newDto.getContent() == null || newDto.getContent().isEmpty() == true || newDto.getDescription() == null
				|| newDto.getDescription().isEmpty() == true || newDto.getTitle() == null
				|| newDto.getTitle().isEmpty() == true) {
			return false;
		} else {
			New news;
			if (newDto.getId() != null) {
				news = newRepository.findById(newDto.getId()).get();// tìm đc entity

				// convert thằng dto vào thằng entity
				news = modelMapper.map(newDto, New.class);
			} else {
				news = modelMapper.map(newDto, New.class);
			}
			news = newRepository.save(news);
			return true;
		}

	}

	@Override
	public boolean deleteNew(Long id) {
		if (id != null) {
			New news = newRepository.findById(id).get();
			news.setDeleted(true);
			newRepository.save(news);
			return true;
		}
		return false;
	}

}