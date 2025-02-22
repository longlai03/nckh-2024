import React, { useState } from "react";
import "./User.css";

const User = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("Dung lượng ảnh phải nhỏ hơn 1 MB!");
                return;
            }
            setAvatar(URL.createObjectURL(file));
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset về giá trị ban đầu nếu cần thiết
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("username", username);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("dob", dob);
    
        if (avatar) {
            const response = await fetch(avatar);
            const blob = await response.blob();
            formData.append("avatar", blob, "avatar.jpg"); // Đặt tên file
        }
    
        try {
            const response = await fetch("http://localhost/nckh-2024/back-end/User/User.php", {
                method: "POST",
                body: formData,
            });
    
            const result = await response.json();
            if (result.success) {
                alert("Thông tin đã cập nhật thành công!");
                setIsEditing(false);
            } else {
                alert("Lỗi: " + result.message);
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    
    return (
        <div className="profile-container">
            <h1>Hồ Sơ Của Tôi</h1>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <form onSubmit={handleSubmit}>
                <div className="profile-avatar">
                    <img
                        src={avatar || "https://via.placeholder.com/150"}
                        alt="Avatar"
                        className="avatar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                        id="upload-avatar"
                    />
                    <label htmlFor="upload-avatar" className="btn-upload">
                        Chọn Ảnh
                    </label>
                    <small>Dung lượng file tối đa 1 MB. Định dạng: .JPEG, .PNG</small>
                </div>

                <div className="profile-field">
                    <label>Tên đăng nhập:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    ) : (
                        <span className="static-field">{username}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Tên:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    ) : (
                        <span className="static-field">{fullName}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Email:</label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        <span className="static-field">{email}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Số điện thoại:</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    ) : (
                        <span className="static-field">{phone}</span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Giới tính:</label>
                    {isEditing ? (
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    ) : (
                        <span className="static-field">
                            {gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "Khác"}
                        </span>
                    )}
                </div>

                <div className="profile-field">
                    <label>Ngày sinh:</label>
                    {isEditing ? (
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    ) : (
                        <span className="static-field">{dob}</span>
                    )}
                </div>

                {isEditing ? (
                    <div className="btn-group">
                        <button type="submit" className="btn-save">
                            Lưu Thông Tin
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancelEdit}
                        >
                            Hủy
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="btn-edit"
                        onClick={toggleEdit}
                    >
                        Chỉnh Sửa
                    </button>
                )}
            </form>
        </div>
    );
};

export default User;
