package com.tractusx.partsmasterdata.controllers;

import com.tractusx.partsmasterdata.controllers.blobstorage.BlobStorageAccess;
import com.tractusx.partsmasterdata.controllers.blobstorage.BlobStorageConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@RestController
public class partmasterdatacontroller {
    @Autowired
    BlobStorageConfiguration config;

    @GetMapping("/")
    public String GetSampleData(){
        return "Sample  JDK11!";
    }

    @PostMapping("/api/upload")
    public String handleFileUpload(@RequestParam("file")MultipartFile file, @RequestParam String company){
        var blobStorageAccess = new BlobStorageAccess(config.storageConnectionstring);
        return blobStorageAccess.UploadFile(file, company);
    }
}
