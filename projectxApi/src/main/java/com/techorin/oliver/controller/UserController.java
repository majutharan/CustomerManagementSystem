package com.techorin.oliver.controller;

import com.techorin.oliver.domain.ErrorResponse;
import com.techorin.oliver.domain.User;
import com.techorin.oliver.exception.MyBusinessException;
import com.techorin.oliver.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;


    @DeleteMapping(path = "/delete")
    public @ResponseBody
    ResponseEntity<Void> deleteUser(@RequestParam Long id) {
        userRepository.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/alluser")
    public @ResponseBody
    Iterable<User> getAllUser() {
        Iterable<User> all = userRepository.findAll();
        return all;
    }
@GetMapping(path = "/view")
public @ResponseBody
User viewUser(@RequestParam Long id) {
        return  userRepository.findOne(id);
}


    @PostMapping(path = "/create")
    public @ResponseBody User addNewUser(@RequestBody User user) {
        logger.info("Creating new user...." + user);
        User saveUser = userRepository.save(user);
        return saveUser;
    }

    @PostMapping(path = "/update")
    public @ResponseBody User update(@RequestBody User user, @RequestParam Long uid) {
        logger.info("Creating new user...." + user);
        User oldUser = userRepository.findOne(uid);
        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setEmail(user.getEmail());
        oldUser.setPassword(user.getPassword());



        User updatedUser = userRepository.save(oldUser);

        return updatedUser;
    }

    /*@GetMapping(path = "/all")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
*/
    @PostMapping(path = "/authenticate")
    public @ResponseBody
    User login(@RequestBody User u) {
        // This returns a JSON or XML with the users
        System.out.println("Username " + u.getEmail());
        System.out.println("Password " + u.getPassword());
        User user = userRepository.findByEmailAndPassword(u.getEmail(), u.getPassword());
        User responseUser = new User();
        if (user != null) {
            responseUser = user;
            responseUser.setToken("39486239463498234");
        } else {
            responseUser.setToken("");
        }
        return responseUser;
    }

  /*  @GetMapping(path = "/checkEmail")
    public @ResponseBody
    User checkEmail(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user;
        } else {
           return new ErrorResponse("400", "Bad Request", "email already exist" );
        }

    }*/

}
