CREATE DATABASE IF NOT EXISTS cadastro_arcas
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_uca1400_ai_ci;

CREATE USER 'slayer_dev'@'localhost' IDENTIFIED BY 'LanhouseMix@1ah';
GRANT ALL PRIVILEGES ON cadastro_arcas.* TO 'slayer_dev'@'localhost';
FLUSH PRIVILEGES;

USE cadastro_arcas;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(255) COLLATE utf8mb4_uca1400_ai_ci NOT NULL,
  email VARCHAR(255) COLLATE utf8mb4_uca1400_ai_ci NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  telefone_contato VARCHAR(20) DEFAULT NULL,
  funcao ENUM('paciente', 'especialista', 'admin') NOT NULL DEFAULT 'paciente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_uca1400_ai_ci;

CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT NOT NULL,
  especialista_id INT NOT NULL,
  data_consulta DATETIME NOT NULL,
  -- talvez adicionar linha nesta tabela: "horario_consulta"
  status ENUM('agendado', 'concluído', 'cancelado') DEFAULT 'agendado',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_agendamento_paciente 
    FOREIGN KEY (paciente_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,

  CONSTRAINT fk_agendamento_especialista
    FOREIGN KEY (especialista_id) REFERENCES usuarios(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_uca1400_ai_ci;