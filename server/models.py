""" Database models for the server. """
from __future__ import annotations

from datetime import UTC, datetime
import uuid

from sqlalchemy import DateTime,  ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Exercise(Base):
    """ Schema for an exercise. """
    __tablename__ = "exercises"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    equipment_tag: Mapped[str] = mapped_column(String, index=True)
    image_source: Mapped[str] = mapped_column(String, nullable=True)
    display_name: Mapped[str] = mapped_column(String, index=True)
    instructions: Mapped[list[str]] = mapped_column(Text, nullable=True)
    difficulty: Mapped[int] = mapped_column(Integer, nullable=True)
    equipment_type: Mapped[str] = mapped_column(String, nullable=True)
    force_type: Mapped[str] = mapped_column(String, nullable=True)
    suggested_sets_reps: Mapped[str] = mapped_column(String, nullable=True)
    suggested_rest_seconds: Mapped[int] = mapped_column(Integer, nullable=True)
    target_muscles: Mapped[list[dict[str, bool]]
                           ] = mapped_column(Text, nullable=True)
    mechanics: Mapped[str] = mapped_column(String, nullable=True)


class HistoryItem(Base):
    """ Schema for a history item. """
    __tablename__ = "history_items"

    id: Mapped[str] = mapped_column(
        String,
        primary_key=True,
        index=True,
        default=lambda: str(uuid.uuid4())
    )
    exercise_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("exercises.id"))
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC))
    device_id: Mapped[str] = mapped_column(String, index=True)
