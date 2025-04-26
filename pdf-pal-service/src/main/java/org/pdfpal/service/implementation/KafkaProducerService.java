package org.pdfpal.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private static final String TOPIC = "mytopic"; // Replace with your topic name

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message) {
        try {
            kafkaTemplate.send(TOPIC, message);
            System.out.println("Message sent: " + message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
