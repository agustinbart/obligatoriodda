package com.ctc.obligatorio2dda.entity;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "planes")
public class Plan implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String destino;

    @Column()
    private Date fecha;

    @Column(length = 9)
    private String modalidad;

    @Column()
    private Double precio;

    @Column()
    private String eliminado;

    public Long getId() {
        return id;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String pDestino) {
        this.destino = pDestino;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date pFecha) {
        this.fecha = pFecha;
    }

    public String getModalidad() {
        return modalidad;
    }

    public void setModalidad(String pModalidad) {
        this.modalidad = pModalidad;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double pPrecio) {
        this.precio = pPrecio;
    }

    public String getEliminado() {
        return eliminado;
    }

    public void setEliminado(String eliminado) {
        this.eliminado = eliminado;
    }

    public void setClientes(Set<Cliente> clientes){
        this.clientes = clientes;
    }

    public Set<Cliente> getClientes(){
        return clientes;
    }

    @ManyToMany(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    },
    mappedBy = "planes")
    @JsonIgnore
    private Set<Cliente> clientes = new HashSet<>();

    public Plan(String pDestino, Date pFecha, String pModalidad, Double pPrecio, String pEliminado) {
        this.destino = pDestino;
        this.fecha = pFecha;
        this.modalidad = pModalidad;
        this.precio = pPrecio;
        this.eliminado = pEliminado;
    }

    public Plan(){ }
} 