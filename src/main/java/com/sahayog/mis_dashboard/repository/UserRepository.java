/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayog.mis_dashboard.repository;

import com.sahayog.mis_dashboard.model.MisUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ritik
 */
@Repository
public interface UserRepository extends JpaRepository<MisUser, Integer> {
    
}
