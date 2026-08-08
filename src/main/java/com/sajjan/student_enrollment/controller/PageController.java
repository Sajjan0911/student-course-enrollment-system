package com.sajjan.student_enrollment.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String dashboard(@AuthenticationPrincipal OAuth2User principal,
                            Model model) {

        if (principal != null) {
            model.addAttribute("name", principal.getAttribute("name"));
            model.addAttribute("email", principal.getAttribute("email"));
            model.addAttribute("picture", principal.getAttribute("picture"));
        }

        return "index";
    }

    @GetMapping("/students-page")
    public String students() {
        return "students";
    }

    @GetMapping("/courses-page")
    public String courses() {
        return "courses";
    }

    @GetMapping("/enrollments-page")
    public String enrollments() {
        return "enrollments";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}