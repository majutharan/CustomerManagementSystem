package com.techorin.oliver.controller;

import com.techorin.oliver.domain.Customer;
import com.techorin.oliver.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@Controller
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping(path = "/create")
    public @ResponseBody Customer CreateCustomer(@RequestBody Customer customer) {
        Customer save = customerRepository.save(customer);
        System.out.println("save details");
        System.out.println(save);
        return save;
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<Void> deleteCustomer(Long cid) {
        customerRepository.delete(cid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/allCustomer")
    public @ResponseBody
    Iterable <Customer> allCustomer() {
        Iterable<Customer> all = customerRepository.findAll();
        return all;
    }

    @GetMapping(path = "/myCustomer")
    public @ResponseBody
    Customer myCustomer(@RequestParam Long cid) {
        return customerRepository.findOne(cid);
    }

    @PostMapping(path = "/update")
    public @ResponseBody Customer updateUser(@RequestBody Customer customer, @RequestParam Long cid) {
        System.out.println("update start");
        Customer oldCustomer = customerRepository.findOne(cid);
        oldCustomer.setFirstName(customer.getFirstName());
        oldCustomer.setLastName(customer.getLastName());
        oldCustomer.setEmail(customer.getEmail());
        oldCustomer.setPhoneNumber(customer.getPhoneNumber());
        oldCustomer.setCreatedBy(customer.getCreatedBy());
        oldCustomer.setCreatedDate(customer.getCreatedDate());

        Customer updatedCustomer = customerRepository.save(oldCustomer);
        return updatedCustomer;

    }

    @GetMapping(path = "/view")
    public @ResponseBody Customer viewUser(@RequestParam Long cid) {
        System.out.println("view customer service");
        return customerRepository.findOne(cid);
    }


}
