package com.codeclan.example.FarkleApp.components;

import com.codeclan.example.FarkleApp.models.User;
import com.codeclan.example.FarkleApp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    public DataLoader() {
    }

    public void run(ApplicationArguments args) {

        User user1 = new User("Jack", 10);
        userRepository.save(user1);

        User user2 = new User("Dicky", 1);
        userRepository.save(user2);

        User user3 = new User("Stru", 100);
        userRepository.save(user3);
    }

}
