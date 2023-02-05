package com.codeclan.example.FarkleApp.repositories;

import com.codeclan.example.FarkleApp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
