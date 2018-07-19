package com.analytic.util;

import java.util.Locale;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonValue;

public class JSendWrapper {
    public enum Status {
        SUCCESS, FAIL, ERROR;

        @JsonValue
        public String toJson() {
            return name().toLowerCase(Locale.ENGLISH);
        }
    }

    static class JsonPage {

        public int limit;
        public int number;
        // public long nextIndex;
        public long totalElements;
        public int totalPages;

    }

    public Status status;
    @JsonInclude(Include.NON_NULL)
    public Object data;
    @JsonInclude(Include.NON_NULL)
    public String message;

    @JsonInclude(Include.NON_NULL)
    public JsonPage page;

    @SuppressWarnings("unused")
    private JSendWrapper() {
    }

    /**
     * Constructor with status OK.
     *
     * @param data the data
     */
    public JSendWrapper(Object data) {
        this.data = data;
        status = Status.SUCCESS;
    }

    /**
     * Constructor with status == code &lt; 500 ? Status.FAIL : Status.ERROR.
     *
     * @param message A translated error/fail message
     * @param code    the return code
     */
    public JSendWrapper(String message, int code) {
        this.message = message;
        status = code < 500 ? Status.FAIL : Status.ERROR;
    }

    /**
     * Constructor with status == code &lt; 500 ? Status.FAIL : Status.ERROR.
     *
     * @param message A translated error/fail message
     * @param code    the return code
     * @param data    the data
     */
    public JSendWrapper(String message, int code, Object data) {
        this.message = message;
        status = code < 500 ? Status.FAIL : Status.ERROR;
        this.data = data;
    }


    public static ResponseEntity<JSendWrapper> ok(Object data) {
        return ok(data, (HttpHeaders) null);
    }

    public static ResponseEntity<JSendWrapper> ok(Object data, HttpHeaders headers) {
        return ok(data, headers, data != null ? HttpStatus.OK : HttpStatus.NO_CONTENT);
    }

    public static ResponseEntity<JSendWrapper> ok(Object data, HttpStatus statusCode) {
        return ok(data, null, statusCode);
    }

    public static ResponseEntity<JSendWrapper> ok(Object data, HttpHeaders headers, HttpStatus statusCode) {
        return new ResponseEntity<JSendWrapper>(new JSendWrapper(data), headers, statusCode);
    }

    public static ResponseEntity<JSendWrapper> error(String message, HttpStatus statusCode) {
        return new ResponseEntity<JSendWrapper>(new JSendWrapper(message, statusCode.value()), statusCode);
    }

    public static ResponseEntity<JSendWrapper> error(String message, HttpStatus statusCode, Object data) {
        return new ResponseEntity<JSendWrapper>(new JSendWrapper(message, statusCode.value(), data), statusCode);
    }
}
