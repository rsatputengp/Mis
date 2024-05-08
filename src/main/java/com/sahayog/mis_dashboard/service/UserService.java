/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayog.mis_dashboard.service;

/**
 *
 * @author ritik
 */
import com.sahayog.mis_dashboard.model.MisUser;
import com.sahayog.mis_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    // Create operation
    public MisUser saveUser(MisUser user) {
        try {
            String encryptPassword = EncryptionDecryption.encryptPassword(user.getPassword());
            user.setPassword(encryptPassword);
            return repository.save(user);
        } catch (Exception ex) {
            Logger.getLogger(UserService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    // Retrieve operations
    public List<MisUser> getAllUsers() {
        return repository.findAll();
    }

    public Optional<MisUser> getUserById(int id) {
        return repository.findById(id);
    }

    // Update operation
    public MisUser updateUser(int id, MisUser user) {
        user.setId(id);
        return repository.save(user);
    }

    // Delete operation
    public void deleteUser(int id) {
        repository.deleteById(id);
    }

    public MisUser getUser(String branchCode, String password) {
        MisUser user = findUserByUsernameAndPassword(branchCode, password);
        if (user != null) {

            try {
                user.setPassword(EncryptionDecryption.decryptPassword(user.getPassword()));
                return user;
            } catch (Exception ex) {
                Logger.getLogger(UserService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }

    private MisUser findUserByUsernameAndPassword(String branchCode, String password) {
        try {
            List<MisUser> users = repository.findAll();
            String encryptPassword = EncryptionDecryption.encryptPassword(password);
            for (MisUser user : users) {
                if (user.getBranchCode().equals(branchCode) && user.getPassword().equals(encryptPassword)) {
                    user.setPassword(encryptPassword);
                    return user;
                }
            }
        } catch (Exception ex) {
            Logger.getLogger(UserService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public MisUser getUserDetails(String branchCode, String branchName) {
        try {
            List<MisUser> users = repository.findAll();
            for (MisUser user : users) {
                if (user.getBranchCode().equals(branchCode) || user.getBranchName().equals(branchName)) {
                    return user;
                }
            }
        } catch (Exception ex) {
            Logger.getLogger(UserService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
}
