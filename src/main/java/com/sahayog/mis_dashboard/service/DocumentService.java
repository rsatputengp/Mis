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
import com.sahayog.mis_dashboard.model.Document;
import com.sahayog.mis_dashboard.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    // Create operation
    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }

    // Retrieve operation
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Optional<Document> getDocumentById(Long id) {
        return documentRepository.findById(id);
    }

    public Document getDocumentByreportTypeAndDate(String reportType, String date) {
        List<Document> allDocuments = getAllDocuments();
        for (Document allDocument : allDocuments) {
            if (allDocument.getReportType().equals(reportType) 
                    && allDocument.getDate().equals(date)) {
                return allDocument;
            }
        }
        return null;
    }

    // Update operation
    public Document updateDocument(Long id, Document document) {
        document.setId(id);
        return documentRepository.save(document);
    }

    // Delete operation
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}
