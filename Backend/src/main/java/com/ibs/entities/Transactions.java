package com.ibs.entities;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "Transactions")
@NoArgsConstructor
@Getter
@Setter
public class Transactions {



private int payer;
private int receiver;
private String mode;

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private int transId;

private int amount;




}
