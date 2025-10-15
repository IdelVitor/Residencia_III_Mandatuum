package com.sedem.api.repositories;

import com.sedem.api.models.UserAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccessLogRepository extends JpaRepository<UserAccessLog, Long> {
}
