import { useState } from "react";

export function HomePage({ onSubmit }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le numéro de téléphone est requis";
    } else if (!/^\d{8,15}$/.test(formData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Numéro de téléphone invalide";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-blue-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌤️ APP METEO</h1>
          <p className="text-gray-600">Bienvenue ! Inscrivez-vous pour continuer</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.nom ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Votre nom"
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.prenom ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Votre prénom"
            />
            {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Numéro de téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.telephone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="+225 XX XX XX XX XX"
            />
            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Adresse email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="exemple@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Accéder à l'application
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;