const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/User");
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const sendMail = require('../utils/sendMail'); 
const app = express();

// Route pour réinitialiser le mot de passe
app.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Générez un nouveau mot de passe temporaire
  const newPassword = randomstring.generate(10);

  try {
    // Enregistrez le nouveau mot de passe temporaire dans la base de données
    await User.findOneAndUpdate({ email }, { password: newPassword });

    // Configurez l'e-mail
    const mailOptions = {
      email,
      subject: 'Réinitialisation de votre mot de passe',
      message: `Votre nouveau mot de passe temporaire est : ${newPassword}`,
    };

    // Envoyez l'e-mail en utilisant votre fonction sendMail
    await sendMail(mailOptions);
    res.json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s est produite lors de l envoi de l e-mail.' });
  }
});