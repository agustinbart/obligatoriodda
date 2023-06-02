package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import com.ctc.obligatorio2dda.entity.Plan;

public interface PlanService {
    public Iterable<Plan> findAll();
    public Optional<Plan> findById(Long Id);
    public Plan save(Plan save);
    public void deleteById(Long Id);
}
