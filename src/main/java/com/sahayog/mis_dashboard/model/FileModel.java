package com.sahayog.mis_dashboard.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

//@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString	
public class FileModel {
	
    private String fileName;
    private String content;
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

    // Getters and setters
    
}

