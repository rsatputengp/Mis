/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sahayog.mis_dashboard.controller;

/**
 *
 * @author ritik
 */
import com.sahayog.mis_dashboard.model.MisUser;
import com.sahayog.mis_dashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    // Create operation
    @PostMapping("/save")
    public ResponseEntity<MisUser> createUser(@RequestBody MisUser user) {
        MisUser createdUser = service.saveUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // Retrieve operations
    @GetMapping("/getallUser")
    public ResponseEntity<List<MisUser>> getAllUsers() {
        List<MisUser> users = service.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<MisUser> getUserById(@PathVariable("id") int id) {
        Optional<MisUser> user = service.getUserById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update operation
    @PutMapping("/update/{id}")
    public ResponseEntity<MisUser> updateUser(@PathVariable("id") int id,
            @RequestBody MisUser user) {
        MisUser updatedUser = service.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Delete operation
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
        service.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Sign in
    @RequestMapping("/login/{branchCode}/{password}")
    public MisUser login(@PathVariable String branchCode,
            @PathVariable String password) {
        MisUser userRecord = service.getUser(branchCode, password);
        return userRecord;
    }

    // Get User Details
    @RequestMapping("/getuserDetails/{branchCode}/{branchName}")
    public MisUser getuserDetails(@PathVariable String branchCode,
            @PathVariable String branchName) {
        return service.getUserDetails(branchCode, branchName);
    }
}
