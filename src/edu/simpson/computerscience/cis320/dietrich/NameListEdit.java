package edu.simpson.computerscience.cis320.dietrich;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    private Pattern firstNameRegex;
    private Pattern lastNameRegex1;
    private Pattern lastNameRegex2;
    private Pattern emailRegex;
    private Pattern phoneRegex;
    private Pattern birthdayRegex;

    public NameListEdit() {
        firstNameRegex = Pattern.compile("^[A-Z]+ ?([A-Za-z]+)?$");
        lastNameRegex1 = Pattern.compile("^([A-Z]([a-z]+)? )?[A-Z][a-z]+$");
        lastNameRegex2 = Pattern.compile("^([A-Z]'[A-Z][a-z]+)$");
        emailRegex = Pattern.compile("^\\w+((\\.\\w+)+)?@(\\w+\\.)+[a-z]+$");
        phoneRegex = Pattern.compile("^\\d{3}-\\d{3}-\\d{4}$");
        birthdayRegex = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        Gson gson = new Gson();

        try {
            String line;
            while((line = reader.readLine()) != null) {
                stringBuilder.append(line).append('\n');
            }
        } finally {
            reader.close();
        }

        Person person = gson.fromJson(stringBuilder.toString(), Person.class);

        if(firstNameRegex.matcher(person.getFirst()).find() &&
            (lastNameRegex1.matcher(person.getLast()).find() ||
             lastNameRegex2.matcher(person.getLast()).find()) &&
            emailRegex.matcher(person.getEmail()).find() &&
            phoneRegex.matcher(person.getPhone()).find() &&
            birthdayRegex.matcher(person.getBirthday()).find()) {
            PersonDAO.addPerson(person);
        } else {
            System.out.println("Inputs did not match validation, try again.");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
