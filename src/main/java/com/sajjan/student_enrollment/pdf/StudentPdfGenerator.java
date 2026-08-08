package com.sajjan.student_enrollment.pdf;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.sajjan.student_enrollment.entity.Student;
import jakarta.servlet.http.HttpServletResponse;

import java.awt.Color;
import java.io.IOException;
import java.util.List;

public class StudentPdfGenerator {

    public static void export(List<Student> students,
                              HttpServletResponse response)
            throws IOException {

        Document document = new Document(PageSize.A4);

        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();

        Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD);

        Paragraph title = new Paragraph("Student Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);

        document.add(title);
        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(4);

        table.setWidthPercentage(100);
        table.setWidths(new float[]{1, 3, 4, 3});

        addHeader(table, "ID");
        addHeader(table, "Name");
        addHeader(table, "Email");
        addHeader(table, "Phone");

        for (Student s : students) {

            table.addCell(String.valueOf(s.getId()));
            table.addCell(s.getName());
            table.addCell(s.getEmail());
            table.addCell(s.getPhone());

        }

        document.add(table);

        document.close();
    }

    private static void addHeader(PdfPTable table,
                                  String text) {

        PdfPCell cell = new PdfPCell();

        cell.setBackgroundColor(Color.BLUE);

        cell.setPhrase(
                new Phrase(
                        text,
                        new Font(Font.HELVETICA,
                                12,
                                Font.BOLD,
                                Color.WHITE)
                )
        );

        table.addCell(cell);

    }
}