package com.ctc.obligatorio2dda.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Cliente implements Serializable {

    @Id
    @Column()
    private Long CI;

    @Column(length = 30)
    private String nombre;

    @Column(length = 30)
    private String apellido;

    @Column(nullable = false, length = 30, unique = true)
    private String email;

    @Column
    private String tipo;

    @ManyToMany(fetch = FetchType.LAZY,
    cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
    @JoinTable(name = "planes_clientes",
    joinColumns = { @JoinColumn(name = "cliente_id")},
    inverseJoinColumns = { @JoinColumn(name = "plan_id")})
    private Set<Plan> planes = new HashSet<>();

    public Long getCI() {
        return CI;
    }

    public void setCI(Long pCI) {
        this.CI = pCI;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String pNombre) {
        this.nombre = pNombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String pApellido) {
        this.apellido = pApellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String pEmail) {
        this.email = pEmail;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String pTipo){
        this.tipo = pTipo;
    }

    public void addPlan(Plan _plan){
        this.planes.add(_plan);
        _plan.getClientes().add(this);
    }

    public void removePlan(Long planId){
        Plan plan = this.planes.stream().filter(t -> t.getId() == planId).findFirst().orElse(null);
        if(plan != null){
            this.planes.remove(plan);
            plan.getClientes().remove(this);
        }
    }

    public Set<Plan> getPlanes(){
        return planes;
    }

    public Cliente(Long pCI, String pNombre, String pApellido, String pEmail, String pTipo) {
        this.CI = pCI;
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.email = pEmail;
        this.tipo = pTipo;
    }

    public Cliente(){ }
} 