import type { Component } from 'vue'

export interface ProfilePayload {
  statusBadge: string
  fullName: string
  headline: string
  phoneRaw: string
  phoneFormatted: string
  location: string
  email: string
}

export interface SkillCategory {
  id: string
  label: string
}

export interface TechStackItem {
  name: string
  category: string
  level: 'Expert' | 'Advanced' | 'Intermediate'
  icon: Component
}

export interface Institution {
  name: string
  period: string
  badge?: string
}

export interface EducationPayload {
  title: string
  institutions: Institution[]
}

export interface TimelineItem {
  role: string
  company: string
  period: string
  metrics: string[]
}
