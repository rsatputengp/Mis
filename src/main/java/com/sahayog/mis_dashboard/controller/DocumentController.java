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
import com.sahayog.mis_dashboard.model.Document;
import com.sahayog.mis_dashboard.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Create operation
    @PostMapping("/save")
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document createdDocument = documentService.saveDocument(document);
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }

    // Retrieve operations
    @GetMapping("/getallDocument")
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @GetMapping("/getDocumentById/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable("id") Long id) {
        Optional<Document> document = documentService.getDocumentById(id);
        if (document.isPresent()) {
            return new ResponseEntity<>(document.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
//    private String reportName;
//
//    private String reportType;
//    
//    private String date;
//
//    private String sheetLink;
    @GetMapping("/getDocumentByreportTypeAndDate/{reportType}/{date}")
    public ResponseEntity<Document> getDocumentById(@PathVariable("reportType") String reportType
            ,@PathVariable("date") String date) {
        Document document = documentService.getDocumentByreportTypeAndDate(reportType, date);
        if (document != null) {
            return new ResponseEntity<>(document, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update operation
    @PutMapping("/update/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable("id") Long id, @RequestBody Document document) {
        Document updatedDocument = documentService.updateDocument(id, document);
        return new ResponseEntity<>(updatedDocument, HttpStatus.OK);
    }

    // Delete operation
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable("id") Long id) {
        documentService.deleteDocument(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}



