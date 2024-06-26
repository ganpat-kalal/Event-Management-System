﻿namespace Backend_EventManagement.Model
{
    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Username{ get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
