package com.techorin.oliver.domain;

public class ErrorResponse {
    private String statusCode;
    private String error;
    private String message;

    public ErrorResponse(String statusCode, String error, String message) {
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
    }


    public String getStatusCode() {
        return statusCode;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }
}
