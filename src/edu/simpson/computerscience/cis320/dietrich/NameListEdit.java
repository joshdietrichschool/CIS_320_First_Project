package edu.simpson.computerscience.cis320.dietrich;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {
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

        PersonDAO.addPerson(gson.fromJson(stringBuilder.toString(), Person.class));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
