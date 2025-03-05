package com.rentify.rentify.service;

import com.rentify.rentify.repository.Properties;
import com.rentify.rentify.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Properties> findAll() {
        return propertyRepository.findAll();
    }

    public Optional<Properties> findById(int id) {
        return propertyRepository.findById(id);
    }

    public Properties save(Properties property) {
        return propertyRepository.save(property);
    }

    public void deleteById(int id) {
        propertyRepository.deleteById(id);
    }

    public long count() {
        return propertyRepository.count();
    }
}
