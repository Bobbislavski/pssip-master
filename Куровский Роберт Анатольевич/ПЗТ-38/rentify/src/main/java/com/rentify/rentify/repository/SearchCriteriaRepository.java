package com.rentify.rentify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchCriteriaRepository extends JpaRepository<SearchCriteria, Integer> {
    void deleteByUser(Users user);
}