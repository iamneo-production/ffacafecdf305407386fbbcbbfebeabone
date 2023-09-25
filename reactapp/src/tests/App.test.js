import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateArea from "../components/CreateArea";
import Note from "../components/Note";

test("displays_error_message_when_both_title_and_content_are_empty", () => {
  render(<CreateArea />);
  
  fireEvent.click(screen.getByText("Add"));
  
  const popupElement = screen.getByText("Please enter both a title and content before adding a note.");
  expect(popupElement).toBeInTheDocument();
});

test("displays_error_message_when_title_is_empty", () => {
  render(<CreateArea />);
  
  fireEvent.change(screen.getByPlaceholderText("Steps to be done ..."), { target: { value: "Test Content" } });
  fireEvent.click(screen.getByText("Add"));
  
  const popupElement = screen.getByText("Please enter both a title and content before adding a note.");
  expect(popupElement).toBeInTheDocument();
});

test("displays_error_message_when_content_is_empty", () => {
  render(<CreateArea />);
  
  fireEvent.change(screen.getByPlaceholderText("Task..."), { target: { value: "Test Title" } });
  fireEvent.click(screen.getByText("Add"));
  
  const popupElement = screen.getByText("Please enter both a title and content before adding a note.");
  expect(popupElement).toBeInTheDocument();
});

test("submitting_non_empty_fields", () => {
  const mockOnAdd = jest.fn();
  render(<CreateArea onAdd={mockOnAdd} />);
  
  fireEvent.change(screen.getByPlaceholderText("Task..."), { target: { value: "Test Title" } });
  fireEvent.change(screen.getByPlaceholderText("Steps to be done ..."), { target: { value: "Test Content" } });
  fireEvent.click(screen.getByText("Add"));
  
  expect(mockOnAdd).toHaveBeenCalledWith(expect.objectContaining({
    title: "Test Title",
    content: "Test Content"
  }));
});

test("renders_note_correctly", () => {
  const mockOnDelete = jest.fn();
  render(<Note id="1" title="Test Title" content="Test Content" onDelete={mockOnDelete} />);
    
  const titleElement = screen.getByText("Test Title");
  const contentElement = screen.getByText("Test Content");
    
  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});

test("rendering_delete_button", () => {
  const mockOnDelete = jest.fn();
  render(<Note id="1" title="Test Title" content="Test Content" onDelete={mockOnDelete} />);
    
  const deleteButton = screen.getByText("DELETE");
  fireEvent.click(deleteButton);
    
  expect(mockOnDelete).toHaveBeenCalledWith("1");
});

test("deletes_note_on_delete_button_click", () => {
  const mockOnDelete = jest.fn();
  render(<Note id="1" title="Test Title" content="Test Content" onDelete={mockOnDelete} />);
  
  const deleteButton = screen.getByText("DELETE");
  fireEvent.click(deleteButton);
  
  expect(mockOnDelete).toHaveBeenCalledWith("1");
  expect(mockOnDelete).toHaveBeenCalledTimes(1); // Ensure onDelete is called once
});

test("does_not_call_onadd_when_adding_empty_note", () => {
  const mockOnAdd = jest.fn();
  render(<CreateArea onAdd={mockOnAdd} />);
  
  fireEvent.click(screen.getByText("Add"));
  
  expect(mockOnAdd).not.toHaveBeenCalled();
});


