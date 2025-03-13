import React, { useState } from "react";

const PersonalInfoTab = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsEditing(false);
  };

  const activityOptions = [
    "Sedentary",
    "Light",
    "Moderate",
    "Active",
    "Very Active",
  ];

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Personal Information</h2>
        {!isEditing && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal">Fitness Goal</label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
              >
                <option value="Lose weight">Lose weight</option>
                <option value="Gain muscle">Gain muscle</option>
                <option value="Maintain weight">Maintain weight</option>
                <option value="Improve fitness">Improve fitness</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
              >
                {activityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setFormData(userData);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="user-info-display">
          <div className="info-grid">
            <div className="info-card">
              <h3>Personal Details</h3>
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">{userData.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{userData.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Age:</span>
                <span className="value">{userData.age}</span>
              </div>
              <div className="info-item">
                <span className="label">Gender:</span>
                <span className="value">{userData.gender}</span>
              </div>
            </div>

            <div className="info-card">
              <h3>Body Metrics</h3>
              <div className="info-item">
                <span className="label">Weight:</span>
                <span className="value">{userData.weight} kg</span>
              </div>
              <div className="info-item">
                <span className="label">Height:</span>
                <span className="value">{userData.height} cm</span>
              </div>
              <div className="info-item">
                <span className="label">BMI:</span>
                <span className="value">
                  {(userData.weight / (userData.height / 100) ** 2).toFixed(1)}
                </span>
              </div>
            </div>

            <div className="info-card">
              <h3>Fitness & Nutrition</h3>
              <div className="info-item">
                <span className="label">Goal:</span>
                <span className="value">{userData.goal}</span>
              </div>
              <div className="info-item">
                <span className="label">Activity:</span>
                <span className="value">{userData.activityLevel}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;
