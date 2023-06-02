package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.obligatorio2dda.entity.Plan;
import com.ctc.obligatorio2dda.repository.PlanRepository;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<Plan> findAll() {
        return planRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Plan> findById(Long Id) {
        return planRepository.findById(Id);
    }

    @Override
    @Transactional
    public Plan save(Plan save) {
        return planRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(Long Id) {
        planRepository.deleteById(Id);
    }
}
