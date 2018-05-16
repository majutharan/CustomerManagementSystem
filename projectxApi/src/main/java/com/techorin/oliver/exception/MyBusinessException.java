package com.techorin.oliver.exception;

public class MyBusinessException extends Exception {

	private static final long serialVersionUID = 7718828512143293558L;

	public MyBusinessException() {
		super();
	}

	public MyBusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public MyBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public MyBusinessException(String message) {
		super(message);
	}

	public MyBusinessException(Throwable cause) {
		super(cause);
	}
}