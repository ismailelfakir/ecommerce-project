// resetPassword.js

const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assurez-vous d'importer correctement votre modèle d'utilisateur

// Endpoint pour envoyer un e-mail de réinitialisation de mot de passe
router.post("/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifiez si l'e-mail existe dans la base de données
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Générez un jeton de réinitialisation (par exemple, un jeton JWT)
    const resetToken = "un-jeton-de-reinitialisation"; // Générez un jeton sécurisé ici

    // Enregistrez le jeton de réinitialisation dans la base de données de l'utilisateur
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Expiration d'une heure
    await user.save();

    // Envoyez un e-mail au client avec un lien contenant le jeton de réinitialisation
    // Ici, vous pouvez utiliser un service comme Nodemailer pour envoyer l'e-mail

    res.status(200).json({ message: "Password reset instructions sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
