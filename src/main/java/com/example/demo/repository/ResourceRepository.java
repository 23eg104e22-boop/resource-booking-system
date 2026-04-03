package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Resource;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

}
