package org.pdfpal.controller.implementation;

import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.pdfpal.service.implementation.KafkaProducerService;

@RestController
@RequestMapping("/api/pdf")
public class PdfController {
    @Autowired
    private KafkaProducerService kafkaProducerService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/merge")
    public ResponseEntity<Resource> mergePdf(@RequestParam("files") MultipartFile[] files) {
        String outputDir = "src/main/resources/files/merged/";
        String mergedPdfFilename = "merged.pdf";
        Path mergedPdfPath = Paths.get(outputDir, mergedPdfFilename);

        try {
            // Ensure the output directory exists
            Files.createDirectories(mergedPdfPath.getParent());

            PDFMergerUtility mergerUtility = new PDFMergerUtility();
            mergerUtility.setDestinationFileName(mergedPdfPath.toString());

            for (MultipartFile file : files) {
                Path tempFile = Files.createTempFile("temp", ".pdf");
                Files.write(tempFile, file.getBytes());
                mergerUtility.addSource(tempFile.toFile());
            }

            mergerUtility.mergeDocuments(null);

            Resource resource = new UrlResource(mergedPdfPath.toUri());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"merged.pdf\"")
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/sendmessage")
    public ResponseEntity<String> sendMessage(@RequestParam("message") String message){
        try {
            kafkaProducerService.sendMessage(message);
            return ResponseEntity.ok("Message sent to Kafka topic: " + message);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.ok("Message could not be sent to Kafka topic: " + message);
        }
    }
}
