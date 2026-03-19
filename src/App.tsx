import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

// ── DATA ──────────────────────────────────────────────────────
const entries = [
  { id: 1, y: 2025, m: 3, mn: "Mar", name: "Rana El Sobky", type: "H", rate: 150, hrs: 18.25, amt: 2737.5, st: "T" },
  { id: 2, y: 2025, m: 3, mn: "Mar", name: "Abaza", type: "H", rate: 250, hrs: 4.5, amt: 1125, st: "T" },
  { id: 3, y: 2025, m: 3, mn: "Mar", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 0, amt: 0, st: "T" },
  { id: 4, y: 2025, m: 4, mn: "Apr", name: "Rana El Sobky", type: "H", rate: 250, hrs: 6, amt: 1500, st: "T" },
  { id: 5, y: 2025, m: 4, mn: "Apr", name: "Abaza", type: "H", rate: 400, hrs: 3.5, amt: 1400, st: "T" },
  { id: 6, y: 2025, m: 4, mn: "Apr", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 7.25, amt: 725, st: "T" },
  { id: 7, y: 2025, m: 4, mn: "Apr", name: "Nada Amin", type: "H", rate: 150, hrs: 17, amt: 2550, st: "T" },
  { id: 8, y: 2025, m: 4, mn: "Apr", name: "Ahmed Hamdy", type: "H", rate: 500, hrs: 9, amt: 4500, st: "T" },
  { id: 9, y: 2025, m: 5, mn: "May", name: "Rana El Sobky", type: "H", rate: 250, hrs: 18, amt: 4500, st: "T" },
  { id: 10, y: 2025, m: 5, mn: "May", name: "Abaza", type: "H", rate: 400, hrs: 4, amt: 1600, st: "T" },
  { id: 11, y: 2025, m: 5, mn: "May", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 1.15, amt: 115, st: "T" },
  { id: 12, y: 2025, m: 5, mn: "May", name: "Nada Amin", type: "H", rate: 150, hrs: 41.78, amt: 6267, st: "T" },
  { id: 13, y: 2025, m: 5, mn: "May", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 8, amt: 2800, st: "T" },
  { id: 14, y: 2025, m: 6, mn: "Jun", name: "Abaza", type: "H", rate: 400, hrs: 3.24, amt: 1296, st: "T" },
  { id: 15, y: 2025, m: 6, mn: "Jun", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 9.59, amt: 959, st: "T" },
  { id: 16, y: 2025, m: 6, mn: "Jun", name: "Nada Amin", type: "H", rate: 150, hrs: 78.4, amt: 11760, st: "T" },
  { id: 17, y: 2025, m: 6, mn: "Jun", name: "Rana El Sobky", type: "H", rate: 250, hrs: 28.16, amt: 7040, st: "T" },
  { id: 18, y: 2025, m: 6, mn: "Jun", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 16, amt: 5600, st: "T" },
  { id: 19, y: 2025, m: 7, mn: "Jul", name: "Rana El Sobky", type: "H", rate: 250, hrs: 9.17, amt: 2292.5, st: "T" },
  { id: 20, y: 2025, m: 7, mn: "Jul", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 10.2, amt: 1020, st: "T" },
  { id: 21, y: 2025, m: 7, mn: "Jul", name: "Nada Amin", type: "H", rate: 150, hrs: 13.5, amt: 2025, st: "T" },
  { id: 22, y: 2025, m: 7, mn: "Jul", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 9, amt: 3150, st: "T" },
  { id: 23, y: 2025, m: 7, mn: "Jul", name: "Amr Tarek", type: "H", rate: 350, hrs: 13.2, amt: 4620, st: "T" },
  { id: 24, y: 2025, m: 8, mn: "Aug", name: "Rana El Sobky", type: "H", rate: 250, hrs: 4.75, amt: 1188, st: "T" },
  { id: 25, y: 2025, m: 8, mn: "Aug", name: "Nada Amin", type: "H", rate: 150, hrs: 2.5, amt: 375, st: "T" },
  { id: 26, y: 2025, m: 8, mn: "Aug", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 30, amt: 10500, st: "T" },
  { id: 27, y: 2025, m: 8, mn: "Aug", name: "Amr Tarek", type: "H", rate: 350, hrs: 56.25, amt: 19688, st: "T" },
  { id: 28, y: 2025, m: 9, mn: "Sep", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 10.2, amt: 1020, st: "T" },
  { id: 29, y: 2025, m: 9, mn: "Sep", name: "Nada Amin", type: "H", rate: 150, hrs: 3.5, amt: 525, st: "T" },
  { id: 30, y: 2025, m: 9, mn: "Sep", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 66.19, amt: 23167, st: "T" },
  { id: 31, y: 2025, m: 9, mn: "Sep", name: "Amr Tarek", type: "H", rate: 350, hrs: 72, amt: 25200, st: "T" },
  { id: 32, y: 2025, m: 9, mn: "Sep", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 6.19, amt: 929, st: "T" },
  { id: 33, y: 2025, m: 9, mn: "Sep", name: "Amal Hamdy", type: "F", rate: 0, hrs: 0, amt: 4000, st: "T" },
  { id: 34, y: 2025, m: 10, mn: "Oct", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 5, amt: 500, st: "T" },
  { id: 35, y: 2025, m: 10, mn: "Oct", name: "Nada Amin", type: "H", rate: 150, hrs: 5.25, amt: 788, st: "T" },
  { id: 36, y: 2025, m: 10, mn: "Oct", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 46, amt: 16100, st: "T" },
  { id: 37, y: 2025, m: 10, mn: "Oct", name: "Amr Tarek", type: "H", rate: 350, hrs: 67.5, amt: 23625, st: "T" },
  { id: 38, y: 2025, m: 10, mn: "Oct", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 39.3, amt: 5895, st: "T" },
  { id: 39, y: 2025, m: 10, mn: "Oct", name: "Amal Hamdy", type: "F", rate: 0, hrs: 111, amt: 6000, st: "T" },
  { id: 40, y: 2025, m: 11, mn: "Nov", name: "Nada Amin", type: "H", rate: 150, hrs: 91, amt: 13650, st: "T" },
  { id: 41, y: 2025, m: 11, mn: "Nov", name: "Amr Tarek", type: "H", rate: 350, hrs: 65.75, amt: 23012.5, st: "T" },
  { id: 42, y: 2025, m: 11, mn: "Nov", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 25.5, amt: 3825, st: "T" },
  { id: 43, y: 2025, m: 11, mn: "Nov", name: "Amal Hamdy", type: "F", rate: 0, hrs: 0, amt: 6000, st: "T" },
  { id: 44, y: 2025, m: 12, mn: "Dec", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 2, amt: 200, st: "O" },
  { id: 45, y: 2025, m: 12, mn: "Dec", name: "Nada Amin", type: "H", rate: 150, hrs: 35, amt: 5250, st: "T" },
  { id: 46, y: 2025, m: 12, mn: "Dec", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 41, amt: 14350, st: "T" },
  { id: 47, y: 2025, m: 12, mn: "Dec", name: "Amr Tarek", type: "H", rate: 350, hrs: 77.14, amt: 26999, st: "T" },
  { id: 48, y: 2025, m: 12, mn: "Dec", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 25, amt: 3750, st: "T" },
  { id: 49, y: 2025, m: 12, mn: "Dec", name: "Amal Hamdy", type: "F", rate: 0, hrs: 0, amt: 6000, st: "T" },
  { id: 50, y: 2025, m: 12, mn: "Dec", name: "Anas Emad", type: "P", rate: 170, hrs: 50, amt: 12500, st: "T" },
  { id: 51, y: 2026, m: 1, mn: "Jan", name: "Alaa Ashraf", type: "H", rate: 100, hrs: 2.5, amt: 250, st: "O" },
  { id: 52, y: 2026, m: 1, mn: "Jan", name: "Nada Amin", type: "H", rate: 150, hrs: 81, amt: 12150, st: "T" },
  { id: 53, y: 2026, m: 1, mn: "Jan", name: "Yasseen Nouh", type: "H", rate: 350, hrs: 27.1, amt: 9485, st: "T" },
  { id: 54, y: 2026, m: 1, mn: "Jan", name: "Amr Tarek", type: "H", rate: 350, hrs: 66, amt: 23100, st: "T" },
  { id: 55, y: 2026, m: 1, mn: "Jan", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 22, amt: 3300, st: "T" },
  { id: 56, y: 2026, m: 1, mn: "Jan", name: "Amal Hamdy", type: "F", rate: 0, hrs: 0, amt: 6000, st: "T" },
  { id: 57, y: 2026, m: 1, mn: "Jan", name: "Anas Emad", type: "P", rate: 170, hrs: 99.2, amt: 16870.75, st: "T" },
  { id: 58, y: 2026, m: 2, mn: "Feb", name: "Nada Amin", type: "H", rate: 150, hrs: 22.85, amt: 3427.5, st: "T" },
  { id: 59, y: 2026, m: 2, mn: "Feb", name: "Yasseen Nouh", type: "H", rate: 900, hrs: 33.95, amt: 30555, st: "T" },
  { id: 60, y: 2026, m: 2, mn: "Feb", name: "Amr Tarek", type: "H", rate: 350, hrs: 55.15, amt: 19302.5, st: "T" },
  { id: 61, y: 2026, m: 2, mn: "Feb", name: "Tarek Mohamed", type: "H", rate: 150, hrs: 18.75, amt: 2812.5, st: "T" },
  { id: 62, y: 2026, m: 2, mn: "Feb", name: "Amal Hamdy", type: "F", rate: 0, hrs: 118.55, amt: 6000, st: "T" },
  { id: 63, y: 2026, m: 2, mn: "Feb", name: "Anas Emad", type: "P", rate: 170, hrs: 73, amt: 12000, st: "T" },
  { id: 64, y: 2026, m: 2, mn: "Feb", name: "Bahaa Mohamed", type: "P", rate: 0, hrs: 18, amt: 16363.64, st: "T" }
];

interface TeamMember {
  name: string;
  type: string;
  rate: number;
  salary: number;
  start: string;
  end: string | null;
  active: boolean;
}

const team: TeamMember[] = [
  { name: "Rana El Sobky", type: "Hourly", rate: 150, salary: 0, start: "Jan 2025", end: "Aug 2025", active: false },
  { name: "Abaza", type: "Hourly", rate: 250, salary: 0, start: "Jan 2025", end: "Jun 2025", active: false },
  { name: "Alaa Ashraf", type: "Hourly", rate: 100, salary: 0, start: "Jan 2025", end: null, active: true },
  { name: "Nada Amin", type: "Hourly", rate: 150, salary: 0, start: "Jan 2025", end: null, active: true },
  { name: "Ahmed Hamdy", type: "Hourly", rate: 500, salary: 0, start: "Jan 2025", end: null, active: false },
  { name: "Yasseen Nouh", type: "Hourly", rate: 900, salary: 0, start: "Jan 2025", end: null, active: true },
  { name: "Amr Tarek", type: "Hourly", rate: 350, salary: 0, start: "Jan 2025", end: null, active: true },
  { name: "Tarek Mohamed", type: "Hourly", rate: 150, salary: 0, start: "Jan 2025", end: null, active: true },
  { name: "Amal Hamdy", type: "Fulltime", rate: 0, salary: 6000, start: "Jan 2025", end: null, active: true },
  { name: "Anas Emad", type: "Part-time", rate: 170, salary: 12000, start: "Dec 2025", end: null, active: true },
  { name: "Bahaa Mohamed", type: "Part-time", rate: 0, salary: 30000, start: "Feb 2026", end: null, active: true }
];

const VITALIS = "https://llrvrcgwhvcaqvscpnsi.supabase.co/functions/v1/team-time-log";
const VITALIS_KEY = "TiQwbG47NLUKYhg";
const FX_API = "https://open.er-api.com/v6/latest/USD";

function fmtEGP(v: number): string {
  return "EGP " + Math.round(v).toLocaleString();
}

function fmtUSD(v: number): string {
  return "$" + Math.round(v).toLocaleString();
}

function stLabel(s: string): string {
  return s === "T" ? "Transferred" : s === "O" ? "Open" : s === "V" ? "Vitalis" : s;
}

function stColor(s: string): string {
  return s === "T" ? "bg-green-100 text-green-800" : s === "V" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800";
}

const MN = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ── EGYPT PUBLIC HOLIDAYS (month-day) ─────────────────────────
const EG_HOLIDAYS: Record<number, string[]> = {
  2025: ["01-07", "01-25", "01-26", "01-27", "03-30", "03-31", "04-01", "04-20", "04-21", "05-01", "06-06", "06-07", "06-08", "06-27", "07-19", "09-27", "10-06", "12-23"],
  2026: ["01-07", "01-25", "01-26", "01-27", "03-20", "03-21", "03-22", "04-05", "04-06", "05-01", "05-27", "05-28", "05-29", "06-16", "07-07", "07-08", "09-17", "10-06", "12-12"]
};

function getWorkingDays(year: number, month: number): number {
  const daysInMonth = new Date(year, month, 0).getDate();
  const holidays = EG_HOLIDAYS[year] || [];
  let count = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dow = date.getDay();
    if (dow === 5 || dow === 6) continue;
    const mmdd = String(month).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    if (holidays.indexOf(mmdd) >= 0) continue;
    count++;
  }
  return count;
}

let _hourOverrides: Record<string, number> = {};

function getRequiredHours(year: number, month: number, empType: string, personName?: string): number {
  const mKey = year + "-" + String(month).padStart(2, "0");
  if (personName) {
    const pKey = mKey + "|" + personName;
    if (_hourOverrides[pKey] !== undefined && _hourOverrides[pKey] !== 0) return _hourOverrides[pKey];
  }
  const tKey = mKey + "|" + empType;
  if (_hourOverrides[tKey] !== undefined && _hourOverrides[tKey] !== 0) return _hourOverrides[tKey];
  const wd = getWorkingDays(year, month);
  if (empType === "Fulltime") return wd * 7;
  if (empType === "Part-time") return wd * 3.5;
  return 0;
}

function getDefaultRequiredHours(year: number, month: number, empType: string): number {
  const wd = getWorkingDays(year, month);
  if (empType === "Fulltime") return wd * 7;
  if (empType === "Part-time") return wd * 3.5;
  return 0;
}

// ── HOURLY RATE HISTORY (per person per month) ────────────────
const rateHistory: Record<string, number> = {
  "Yasseen Nouh|2025-03": 350, "Yasseen Nouh|2025-04": 350, "Yasseen Nouh|2025-05": 350,
  "Yasseen Nouh|2025-06": 350, "Yasseen Nouh|2025-07": 350, "Yasseen Nouh|2025-08": 350,
  "Yasseen Nouh|2025-09": 350, "Yasseen Nouh|2025-10": 350, "Yasseen Nouh|2025-11": 350,
  "Yasseen Nouh|2025-12": 350, "Yasseen Nouh|2026-01": 350, "Yasseen Nouh|2026-02": 900,
  "Rana El Sobky|2025-03": 150, "Rana El Sobky|2025-04": 250, "Rana El Sobky|2025-05": 250,
  "Rana El Sobky|2025-06": 250, "Rana El Sobky|2025-07": 250, "Rana El Sobky|2025-08": 250,
  "Abaza|2025-03": 250, "Abaza|2025-04": 400, "Abaza|2025-05": 400, "Abaza|2025-06": 400,
  "Anas Emad|2025-12": 170, "Anas Emad|2026-01": 170, "Anas Emad|2026-02": 170
};

function getRate(name: string, year: number, month: number): number {
  const key = name + "|" + year + "-" + String(month).padStart(2, "0");
  if (rateHistory[key] !== undefined) return rateHistory[key];
  const mem = team.find((t) => t.name === name);
  return mem ? mem.rate : 0;
}

// ── SALARY CALCULATION with deductions/overtime ───────────────
interface SalaryCalc {
  base: number;
  deduction: number;
  overtime: number;
  total: number;
  required: number;
  diff: number;
  rate: number;
}

function calcSalaryPay(name: string, year: number, month: number, hoursLogged: number, isException: boolean): SalaryCalc {
  const mem = team.find((t) => t.name === name);
  if (!mem || !mem.salary) return { base: 0, deduction: 0, overtime: 0, total: 0, required: 0, diff: 0, rate: 0 };
  const required = getRequiredHours(year, month, mem.type, name);
  let rate = getRate(name, year, month) || 0;
  if (rate === 0 && required > 0) rate = mem.salary / required;
  const diff = hoursLogged - required;
  let deduction = 0, overtime = 0;
  if (diff < 0 && !isException) {
    deduction = Math.abs(diff) * rate;
  } else if (diff > 0) {
    overtime = diff * rate;
  }
  const total = mem.salary - deduction + overtime;
  return { base: mem.salary, deduction, overtime, total, required, diff, rate };
}

// ── LOGIN ─────────────────────────────────────────────────────
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const [pw, setPw] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);

  function go(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "rishca2026") {
      props.onLogin();
    } else {
      setErr(true);
      setPw("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <form onSubmit={go} className="bg-white rounded-2xl shadow-2xl p-10 w-96 text-center">
        <div className="text-4xl font-black text-slate-900 mb-1">Rishca OS</div>
        <div className="text-slate-500 mb-8">Team Budget Manager</div>
        {err && <div className="bg-red-50 text-red-600 text-sm p-2 rounded mb-4">Wrong password</div>}
        <input
          type="password"
          placeholder="Enter password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

// ── DASHBOARD TAB ─────────────────────────────────────────────
interface DashTabProps {
  data: any[];
  fx: number;
}

const DashTab: React.FC<DashTabProps> = (props) => {
  const { data, fx } = props;
  const allTime = data.reduce((s, e) => s + e.amt, 0);
  const now = new Date();
  const curM = now.getMonth() + 1, curY = now.getFullYear();
  const thisMonth = data.filter((e) => e.y === curY && e.m === curM).reduce((s, e) => s + e.amt, 0);

  const months: Record<string, number> = {};
  data.forEach((e) => {
    const k = e.y + "-" + String(e.m).padStart(2, "0");
    months[k] = (months[k] || 0) + e.amt;
  });

  const mKeys = Object.keys(months).sort();
  const avgBurn = mKeys.length ? allTime / mKeys.length : 0;
  const activeCount = team.filter((t) => t.active).length;

  const chartRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLCanvasElement>(null);
  const lineInst = useRef<Chart | null>(null);
  const barInst = useRef<Chart | null>(null);

  useEffect(() => {
    if (lineInst.current) lineInst.current.destroy();
    if (chartRef.current) {
      lineInst.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: mKeys.map((k) => MN[parseInt(k.split("-")[1])] + " " + k.split("-")[0].slice(2)),
          datasets: [
            {
              label: "Monthly (EGP)",
              data: mKeys.map((k) => months[k]),
              borderColor: "#0d9488",
              backgroundColor: "rgba(13,148,136,0.1)",
              tension: 0.4,
              fill: true,
              pointRadius: 5,
              pointBackgroundColor: "#0d9488"
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
    if (barInst.current) barInst.current.destroy();
    if (barRef.current) {
      const ppl: Record<string, number> = {};
      data.forEach((e) => {
        ppl[e.name] = (ppl[e.name] || 0) + e.amt;
      });
      const names = Object.keys(ppl).sort((a, b) => ppl[b] - ppl[a]);
      barInst.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: names,
          datasets: [
            {
              label: "Total Earned (EGP)",
              data: names.map((n) => ppl[n]),
              backgroundColor: "#0d9488",
              borderRadius: 4
            }
          ]
        },
        options: {
          indexAxis: "y" as const,
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }
    return () => {
      if (lineInst.current) lineInst.current.destroy();
      if (barInst.current) barInst.current.destroy();
    };
  }, [data]);

  function kpi(label: string, egp: number) {
    return (
      <div key={label} className="bg-white rounded-xl shadow p-5 border border-slate-200">
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-bold text-slate-900 mt-1">{fmtEGP(egp)}</div>
        {fx > 0 && <div className="text-sm text-teal-600 mt-1">{fmtUSD(egp / fx)}</div>}
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpi("This Month", thisMonth)}
        {kpi("All Time", allTime)}
        <div className="bg-white rounded-xl shadow p-5 border border-slate-200">
          <div className="text-sm text-slate-500">Active Members</div>
          <div className="text-2xl font-bold text-teal-600 mt-1">{activeCount}</div>
        </div>
        {kpi("Avg Monthly Burn", avgBurn)}
      </div>
      {fx > 0 && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <span className="text-teal-800 font-medium">Live FX Rate: 1 USD = {fx.toFixed(2)} EGP</span>
          <span className="text-teal-600 text-sm">Source: ExchangeRate-API</span>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-5 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3">Monthly Spend Trend</h3>
          <canvas ref={chartRef} />
        </div>
        <div className="bg-white rounded-xl shadow p-5 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3">Top Earners</h3>
          <canvas ref={barRef} />
        </div>
      </div>
    </div>
  );
};

// ── TIME LOG TAB ──────────────────────────────────────────────
interface LogTabProps {
  data: any[];
  setData: (data: any[]) => void;
}

const LogTab: React.FC<LogTabProps> = (props) => {
  const { data } = props;
  const [nameF, setNameF] = useState<string>("");
  const [monthF, setMonthF] = useState<string>("");
  const [stF, setStF] = useState<string>("");
  const [sortK, setSortK] = useState<string>("id");
  const [sortD, setSortD] = useState<number>(1);

  const names: string[] = [];
  data.forEach((e) => {
    if (names.indexOf(e.name) < 0) names.push(e.name);
  });
  names.sort();

  const monthsSet: string[] = [];
  data.forEach((e) => {
    const k = e.mn + " " + e.y;
    if (monthsSet.indexOf(k) < 0) monthsSet.push(k);
  });

  const filtered = data
    .filter((e) => {
      if (nameF && e.name !== nameF) return false;
      if (monthF && e.mn + " " + e.y !== monthF) return false;
      if (stF && e.st !== stF) return false;
      return true;
    })
    .sort((a, b) => {
      const av = a[sortK];
      const bv = b[sortK];
      return av < bv ? -sortD : av > bv ? sortD : 0;
    });

  function thClick(k: string) {
    if (sortK === k) setSortD(-sortD);
    else {
      setSortK(k);
      setSortD(1);
    }
  }

  function sel(val: string, set: (v: string) => void, opts: string[], placeholder: string) {
    return (
      <select
        value={val}
        onChange={(e) => set(e.target.value)}
        className="border border-slate-300 rounded px-3 py-2 text-sm"
      >
        <option value="">{placeholder}</option>
        {opts.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }

  function th(label: string, key: string) {
    return (
      <th
        onClick={() => thClick(key)}
        className="px-3 py-2 text-left text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 select-none"
      >
        {label}
        {sortK === key ? (sortD > 0 ? " ▲" : " ▼") : ""}
      </th>
    );
  }

  return (
    <div className="fade-in">
      <div className="flex flex-wrap gap-3 mb-4">
        {sel(nameF, setNameF, names, "All Members")}
        {sel(monthF, setMonthF, monthsSet, "All Months")}
        {sel(stF, setStF, ["T", "O"], "All Status")}
        <span className="text-sm text-slate-500 self-center">{filtered.length} entries</span>
      </div>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {th("#", "id")}
              {th("Year", "y")}
              {th("Month", "mn")}
              {th("Name", "name")}
              {th("Rate", "rate")}
              {th("Hours", "hrs")}
              {th("Amount", "amt")}
              {th("Status", "st")}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-2 text-slate-400">{e.id}</td>
                <td className="px-3 py-2">{e.y}</td>
                <td className="px-3 py-2">{e.mn}</td>
                <td className="px-3 py-2 font-medium">{e.name}</td>
                <td className="px-3 py-2">{e.rate ? fmtEGP(e.rate) : "-"}</td>
                <td className="px-3 py-2">{e.hrs}</td>
                <td className="px-3 py-2 font-semibold">{fmtEGP(e.amt)}</td>
                <td className="px-3 py-2">
                  <span className={"px-2 py-1 rounded text-xs font-medium " + stColor(e.st)}>{stLabel(e.st)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── TEAM TAB ──────────────────────────────────────────────────
interface TeamTabProps {
  data: any[];
}

const TeamTab: React.FC<TeamTabProps> = (props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 fade-in">
      {team.map((t) => {
        let hrs = 0, earned = 0;
        props.data.forEach((e) => {
          if (e.name === t.name) {
            hrs += e.hrs;
            earned += e.amt;
          }
        });
        return (
          <div key={t.name} className="bg-white rounded-xl shadow p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="font-bold text-lg text-slate-900">{t.name}</div>
              <span className={t.active ? "bg-teal-500 text-white text-xs px-2 py-1 rounded" : "bg-slate-200 text-slate-500 text-xs px-2 py-1 rounded"}>
                {t.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <p>Type: <strong>{t.type}</strong></p>
              {t.rate > 0 && <p>Rate: <strong className="text-blue-600">{fmtEGP(t.rate)}/hr</strong></p>}
              {t.salary > 0 && <p>Salary: <strong className="text-blue-600">{fmtEGP(t.salary)}/mo</strong></p>}
              <p>Period: {t.start}{t.end ? " → " + t.end : " → Present"}</p>
              <p className="mt-2 pt-2 border-t border-slate-100">
                Total: <strong className="text-teal-600">{fmtEGP(earned)}</strong> · {Math.round(hrs)} hrs
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── PAYMENTS TAB (NEW) ────────────────────────────────────────
interface PayTabProps {
  data: any[];
  setData: (data: any[]) => void;
  fx: number;
  exceptions: [Record<string, boolean>, (x: any) => void];
}

const PayTab: React.FC<PayTabProps> = (props) => {
  const { data, setData, fx } = props;
  const [curM, setCurM] = useState<number>(new Date().getMonth() + 1);
  const [curY, setCurY] = useState<number>(new Date().getFullYear());
  const wd = getWorkingDays(curY, curM);

  const byPerson: Record<string, any> = {};
  data.filter((e) => e.y === curY && e.m === curM).forEach((e) => {
    if (!byPerson[e.name])
      byPerson[e.name] = { entries: [], totalHrs: 0, rawAmt: 0, allTransferred: true };
    byPerson[e.name].entries.push(e);
    byPerson[e.name].totalHrs += e.hrs;
    byPerson[e.name].rawAmt += e.amt;
    if (e.st !== "T" && e.st !== "V") byPerson[e.name].allTransferred = false;
  });

  team.forEach((t) => {
    if (t.salary > 0 && !byPerson[t.name]) {
      const sp = t.start.split(" ");
      const sM = MN.indexOf(sp[0]);
      const sY = parseInt(sp[1]);
      if (curY > sY || (curY === sY && curM >= sM))
        byPerson[t.name] = { entries: [], totalHrs: 0, rawAmt: 0, allTransferred: false };
    }
  });

  const payDetails: Record<string, any> = {};
  let grandTotal = 0;
  Object.keys(byPerson).forEach((name) => {
    const p = byPerson[name];
    const mem = team.find((t) => t.name === name);
    const excKey = name + "|" + curY + "-" + String(curM).padStart(2, "0");
    const isExc = props.exceptions[0][excKey] || false;

    if (mem && mem.salary > 0) {
      const calc = calcSalaryPay(name, curY, curM, p.totalHrs, isExc);
      payDetails[name] = {
        pay: calc.total,
        base: calc.base,
        deduction: calc.deduction,
        overtime: calc.overtime,
        required: calc.required,
        diff: calc.diff,
        rate: calc.rate,
        isSalaried: true,
        isExc: isExc
      };
      grandTotal += calc.total;
    } else {
      payDetails[name] = { pay: p.rawAmt, isSalaried: false };
      grandTotal += p.rawAmt;
    }
  });

  const pendingTotal = Object.keys(byPerson).reduce(
    (s, n) => s + (byPerson[n].allTransferred ? 0 : payDetails[n]?.pay || 0),
    0
  );

  function markAllTransferred(personName: string) {
    setData(
      data.map((e) => {
        if (e.name === personName && e.y === curY && e.m === curM)
          return { ...e, st: "T" };
        return e;
      })
    );
  }

  function toggleException(name: string) {
    const key = name + "|" + curY + "-" + String(curM).padStart(2, "0");
    props.exceptions[1]((prev: Record<string, boolean>) => {
      const n = { ...prev };
      n[key] = !n[key];
      return n;
    });
  }

  return (
    <div className="fade-in">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={curM}
          onChange={(e) => setCurM(parseInt(e.target.value))}
          className="border border-slate-300 rounded-lg px-4 py-2 font-medium"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
            <option key={m} value={m}>{MN[m]}</option>
          ))}
        </select>
        <select
          value={curY}
          onChange={(e) => setCurY(parseInt(e.target.value))}
          className="border border-slate-300 rounded-lg px-4 py-2 font-medium"
        >
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
        <div className="bg-slate-100 rounded-lg px-3 py-2 text-sm text-slate-600">
          {wd} working days · {wd * 7}h FT · {wd * 3.5}h PT
        </div>
        <div className="ml-auto text-right">
          <div className="text-sm text-slate-500">Total to Pay</div>
          <div className="text-2xl font-bold text-slate-900">{fmtEGP(grandTotal)}</div>
          {fx > 0 && <div className="text-sm text-teal-600">{fmtUSD(grandTotal / fx)}</div>}
        </div>
      </div>
      {pendingTotal > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
          <span className="font-semibold text-yellow-800">Pending: {fmtEGP(pendingTotal)}</span>
          {fx > 0 && <span className="text-yellow-600 ml-2">({fmtUSD(pendingTotal / fx)})</span>}
        </div>
      )}
      <div className="space-y-3">
        {Object.keys(byPerson)
          .sort()
          .map((name) => {
            const p = byPerson[name];
            const pd = payDetails[name];
            const mem = team.find((t) => t.name === name);

            return (
              <div key={name} className="bg-white rounded-xl shadow border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg text-slate-900">{name}</div>
                    <div className="text-sm text-slate-500">
                      {mem ? mem.type : "Hourly"} · {p.totalHrs.toFixed(1)} hrs logged
                      {pd.isSalaried
                        ? " · " + pd.required + "h required"
                        : mem && mem.rate > 0
                        ? " @ " + fmtEGP(getRate(name, curY, curM)) + "/hr"
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">{fmtEGP(pd.pay)}</div>
                      {fx > 0 && <div className="text-sm text-teal-600">{fmtUSD(pd.pay / fx)}</div>}
                    </div>
                    <button
                      onClick={() => markAllTransferred(name)}
                      className={
                        p.allTransferred
                          ? "bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium text-sm"
                          : "bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                      }
                    >
                      {p.allTransferred ? "✓ Paid" : "Mark Paid"}
                    </button>
                  </div>
                </div>
                {pd.isSalaried && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-slate-500">Base: {fmtEGP(pd.base)}</span>
                    {pd.diff < 0 && !pd.isExc && (
                      <span className="text-red-600 font-semibold">
                        Deduction: -{fmtEGP(pd.deduction)} ({Math.abs(pd.diff).toFixed(1)}h short × {fmtEGP(pd.rate)}/hr)
                      </span>
                    )}
                    {pd.diff > 0 && (
                      <span className="text-green-600 font-semibold">
                        Overtime: +{fmtEGP(pd.overtime)} ({pd.diff.toFixed(1)}h extra × {fmtEGP(pd.rate)}/hr)
                      </span>
                    )}
                    {pd.isExc && pd.diff < 0 && (
                      <span className="text-amber-600 font-semibold">Exception: no deduction (manager override)</span>
                    )}
                    {pd.diff < 0 && (
                      <button
                        onClick={() => toggleException(name)}
                        className={
                          pd.isExc
                            ? "bg-amber-100 text-amber-700 px-3 py-1 rounded text-xs font-medium border border-amber-300"
                            : "bg-slate-100 text-slate-500 px-3 py-1 rounded text-xs font-medium border border-slate-200 hover:bg-amber-50"
                        }
                      >
                        {pd.isExc ? "✓ Exception Active" : "Grant Exception"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

// ── SCENARIOS TAB ─────────────────────────────────────────────
const ScenTab: React.FC = () => {
  const [hc, setHc] = useState<number>(11);
  const [rateAdj, setRateAdj] = useState<number>(0);
  const [burnAdj, setBurnAdj] = useState<number>(0);

  const baseBurn = 50000;
  const projected = baseBurn * (1 + burnAdj / 100) * (hc / 11) * (1 + rateAdj / 100);
  const annual = projected * 12;
  const revenue = 48798.5;
  const profit = revenue - (projected * 12) / 12;

  function slider(label: string, val: number, set: (v: number) => void, min: number, max: number, unit: string) {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">{label}</span>
          <span className="text-sm font-bold text-teal-600">
            {val}
            {unit}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => set(parseInt(e.target.value))}
          className="w-full accent-teal-600"
        />
      </div>
    );
  }

  return (
    <div className="fade-in grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
        <h3 className="font-bold text-lg text-slate-900 mb-6">Adjust Assumptions</h3>
        {slider("Headcount", hc, setHc, 1, 25, "")}
        {slider("Rate Change", rateAdj, setRateAdj, -50, 100, "%")}
        {slider("Burn Adjustment", burnAdj, setBurnAdj, -50, 100, "%")}
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
        <h3 className="font-bold text-lg text-slate-900 mb-6">Projected Impact</h3>
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="text-slate-600">Monthly Team Cost</span>
            <span className="font-bold text-xl">{fmtEGP(projected)}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="text-slate-600">Annual Team Cost</span>
            <span className="font-bold text-xl">{fmtEGP(annual)}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="text-slate-600">FY26 Revenue</span>
            <span className="font-bold text-xl">{fmtEGP(revenue)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-slate-600">Monthly Profit/Loss</span>
            <span className={`font-bold text-xl ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {fmtEGP(profit)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── RATES TAB ─────────────────────────────────────────────────
interface RatesTabProps {
  rateHistory: Record<string, number>;
  setRateHistory: (rh: Record<string, number>) => void;
}

const RatesTab: React.FC<RatesTabProps> = (props) => {
  const { rateHistory, setRateHistory: setRH } = props;
  const months = [
    "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08",
    "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03"
  ];
  const names = team.filter((t) => t.active || t.rate > 0).map((t) => t.name);

  function updateRate(name: string, mKey: string, val: string) {
    const key = name + "|" + mKey;
    const next = { ...rateHistory };
    next[key] = parseFloat(val) || 0;
    setRH(next);
  }

  return (
    <div className="fade-in">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Hourly Rates by Month (EGP)</h2>
      <p className="text-sm text-slate-500 mb-4">Edit any cell to update the rate for that person/month. Changes affect Payments calculations.</p>
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-2 text-left sticky left-0 bg-slate-50 z-10 min-w-[140px]">Name</th>
              {months.map((m) => {
                const parts = m.split("-");
                return (
                  <th key={m} className="px-3 py-2 text-center min-w-[80px]">
                    {MN[parseInt(parts[1])]} {parts[0].slice(2)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {names.map((name, ni) => {
              const mem = team.find((t) => t.name === name);
              return (
                <tr key={name} className={ni % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className={`px-3 py-2 font-medium sticky left-0 z-10 ${ni % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    {name}
                    {mem && mem.salary > 0 && <span className="text-xs text-teal-600 ml-1">({mem.type})</span>}
                  </td>
                  {months.map((mKey) => {
                    const key = name + "|" + mKey;
                    const rate = rateHistory[key] !== undefined ? rateHistory[key] : mem ? mem.rate : 0;
                    return (
                      <td key={mKey} className="px-1 py-1 text-center">
                        <input
                          type="number"
                          value={rate || ""}
                          onChange={(e) => updateRate(name, mKey, e.target.value)}
                          className="w-full text-center border border-slate-200 rounded px-1 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          style={{ color: rate > 0 ? "#2563eb" : "#94a3b8" }}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── WORKING HOURS TARGET TAB ──────────────────────────────────
interface HoursTabProps {
  data: any[];
  hourOvr: Record<string, number>;
  setHourOvr: (ho: Record<string, number>) => void;
}

const HoursTab: React.FC<HoursTabProps> = (props) => {
  const { data, hourOvr, setHourOvr: setHO } = props;
  const months = [
    "2025-03", "2025-04", "2025-05", "2025-06", "2025-07", "2025-08",
    "2025-09", "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03"
  ];
  const salaried = team.filter((t) => t.salary > 0);

  function setOverride(mKey: string, empType: string, val: string | number) {
    const key = mKey + "|" + empType;
    const next = { ...hourOvr };
    if (val === "" || val === null) {
      delete next[key];
    } else {
      next[key] = parseFloat(String(val));
    }
    setHO(next);
  }

  function getOvr(mKey: string, empType: string): string | number {
    const key = mKey + "|" + empType;
    return hourOvr[key] !== undefined ? hourOvr[key] : "";
  }

  return (
    <div className="fade-in">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Working Hours Target vs Actual</h2>
      <p className="text-sm text-slate-500 mb-4">
        Click any target hours cell to override. Clear to reset to auto-calculated value. Based on Egyptian working days (Sun-Thu) × 7 hrs/day.
      </p>

      <div className="bg-white rounded-xl shadow border border-slate-200 p-5 mb-6 overflow-x-auto">
        <h3 className="font-bold text-slate-900 mb-3">Working Days & Target Hours per Month</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 py-2 text-left"></th>
              {months.map((mKey) => {
                const parts = mKey.split("-");
                return (
                  <th key={mKey} className="px-3 py-2 text-center min-w-[85px]">
                    {MN[parseInt(parts[1])]} {parts[0].slice(2)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2 font-medium text-slate-600">Working Days</td>
              {months.map((mKey) => {
                const parts = mKey.split("-");
                return (
                  <td key={mKey} className="px-3 py-2 text-center font-bold text-slate-900">
                    {getWorkingDays(parseInt(parts[0]), parseInt(parts[1]))}
                  </td>
                );
              })}
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2 font-medium text-slate-600">FT Target (hrs)</td>
              {months.map((mKey) => {
                const parts = mKey.split("-");
                const def = getDefaultRequiredHours(parseInt(parts[0]), parseInt(parts[1]), "Fulltime");
                const val = getOvr(mKey, "Fulltime");
                return (
                  <td key={mKey} className="px-1 py-1 text-center">
                    <input
                      type="number"
                      value={val === "" ? def : val}
                      placeholder={String(def)}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || parseFloat(v) === def)
                          setOverride(mKey, "Fulltime", "");
                        else
                          setOverride(mKey, "Fulltime", v);
                      }}
                      className={`w-full text-center border rounded px-1 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                        val !== "" ? "border-teal-400 bg-teal-50 text-teal-700 font-bold" : "border-slate-200 text-slate-600"
                      }`}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium text-slate-600">PT Target (hrs)</td>
              {months.map((mKey) => {
                const parts = mKey.split("-");
                const def = getDefaultRequiredHours(parseInt(parts[0]), parseInt(parts[1]), "Part-time");
                const val = getOvr(mKey, "Part-time");
                return (
                  <td key={mKey} className="px-1 py-1 text-center">
                    <input
                      type="number"
                      value={val === "" ? def : val}
                      placeholder={String(def)}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "" || parseFloat(v) === def)
                          setOverride(mKey, "Part-time", "");
                        else
                          setOverride(mKey, "Part-time", v);
                      }}
                      className={`w-full text-center border rounded px-1 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                        val !== "" ? "border-teal-400 bg-teal-50 text-teal-700 font-bold" : "border-slate-200 text-slate-600"
                      }`}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <p className="text-xs text-slate-400 mt-2">Teal-highlighted cells have manual overrides. Clear the value to reset to auto-calculated.</p>
      </div>

      {salaried.map((emp) => (
        <div key={emp.name} className="bg-white rounded-xl shadow border border-slate-200 mb-4 overflow-x-auto">
          <div className="px-5 pt-4 pb-2 border-b border-slate-100">
            <span className="font-bold text-lg text-slate-900">{emp.name}</span>
            <span className="ml-2 text-sm text-teal-600">{emp.type} · {fmtEGP(emp.salary)}/mo</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-3 py-2 text-left"></th>
                {months.map((mKey) => {
                  const parts = mKey.split("-");
                  return (
                    <th key={mKey} className="px-3 py-2 text-center min-w-[85px]">
                      {MN[parseInt(parts[1])]} {parts[0].slice(2)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium text-slate-600">Required</td>
                {months.map((mKey) => {
                  const parts = mKey.split("-");
                  const y = parseInt(parts[0]);
                  const m = parseInt(parts[1]);
                  const def = getDefaultRequiredHours(y, m, emp.type);
                  const ovrKey = mKey + "|" + emp.name;
                  const personalOvr = hourOvr[ovrKey];
                  const typeOvr = hourOvr[mKey + "|" + emp.type];
                  const current = personalOvr !== undefined ? personalOvr : typeOvr !== undefined ? typeOvr : def;
                  const isOverridden = personalOvr !== undefined;
                  return (
                    <td key={mKey} className="px-1 py-1 text-center">
                      <input
                        type="number"
                        value={isOverridden ? personalOvr : current}
                        placeholder={String(def)}
                        onChange={(e) => {
                          const v = e.target.value;
                          const next = { ...hourOvr };
                          if (v === "" || parseFloat(v) === def) {
                            delete next[ovrKey];
                          } else {
                            next[ovrKey] = parseFloat(v);
                          }
                          setHO(next);
                        }}
                        className={`w-full text-center border rounded px-1 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                          isOverridden ? "border-teal-400 bg-teal-50 text-teal-700 font-bold" : "border-slate-200 text-slate-500"
                        }`}
                      />
                    </td>
                  );
                })}
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium text-slate-600">Logged</td>
                {months.map((mKey) => {
                  const parts = mKey.split("-");
                  const y = parseInt(parts[0]);
                  const m = parseInt(parts[1]);
                  const logged = data
                    .filter((e) => e.name === emp.name && e.y === y && e.m === m)
                    .reduce((s: number, e: any) => s + e.hrs, 0);
                  const req = getRequiredHours(y, m, emp.type, emp.name);
                  const color = logged >= req ? "text-green-600" : logged > 0 ? "text-red-600" : "text-slate-300";
                  return (
                    <td key={mKey} className={`px-3 py-2 text-center font-semibold ${color}`}>
                      {logged > 0 ? logged.toFixed(1) + "h" : "—"}
                    </td>
                  );
                })}
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium text-slate-600">Diff</td>
                {months.map((mKey) => {
                  const parts = mKey.split("-");
                  const y = parseInt(parts[0]);
                  const m = parseInt(parts[1]);
                  const logged = data
                    .filter((e) => e.name === emp.name && e.y === y && e.m === m)
                    .reduce((s: number, e: any) => s + e.hrs, 0);
                  const req = getRequiredHours(y, m, emp.type, emp.name);
                  if (logged === 0) return <td key={mKey} className="px-3 py-2 text-center text-slate-300">—</td>;
                  const diff = logged - req;
                  const color = diff >= 0 ? "text-green-600" : "text-red-600";
                  return (
                    <td key={mKey} className={`px-3 py-2 text-center font-bold ${color}`}>
                      {(diff >= 0 ? "+" : "") + diff.toFixed(1) + "h"}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-slate-600">Pay</td>
                {months.map((mKey) => {
                  const parts = mKey.split("-");
                  const y = parseInt(parts[0]);
                  const m = parseInt(parts[1]);
                  const logged = data
                    .filter((e) => e.name === emp.name && e.y === y && e.m === m)
                    .reduce((s: number, e: any) => s + e.hrs, 0);
                  if (logged === 0) return <td key={mKey} className="px-3 py-2 text-center text-slate-300">—</td>;
                  const calc = calcSalaryPay(emp.name, y, m, logged, false);
                  const color = calc.deduction > 0 ? "text-red-600" : calc.overtime > 0 ? "text-green-600" : "text-slate-900";
                  return (
                    <td key={mKey} className={`px-3 py-2 text-center text-xs ${color}`}>
                      <div className="font-bold">{fmtEGP(calc.total)}</div>
                      {calc.deduction > 0 && <div className="text-red-500">-{fmtEGP(calc.deduction)}</div>}
                      {calc.overtime > 0 && <div className="text-green-500">+{fmtEGP(calc.overtime)}</div>}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

// ── PERSISTENCE (localStorage) ────────────────────────────────
const STORE_KEY = "rishca_budget_v1";

function loadSaved() {
  try {
    const s = localStorage.getItem(STORE_KEY);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}

function saveState(obj: any) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(obj));
  } catch (e) {}
}

// ── MAIN APP ──────────────────────────────────────────────────
const App: React.FC = () => {
  const saved = loadSaved();
  const [logged, setLogged] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("dashboard");
  const [data, setData] = useState<any[]>(saved && saved.entries ? saved.entries : entries);
  const [fx, setFx] = useState<number>(0);
  const [fxLoading, setFxLoading] = useState<boolean>(false);
  const [syncMsg, setSyncMsg] = useState<string>("");
  const [rh, setRH] = useState<Record<string, number>>(
    saved && saved.rateHistory ? saved.rateHistory : { ...rateHistory }
  );
  const [exceptions, setExceptions] = useState<Record<string, boolean>>(
    saved && saved.exceptions ? saved.exceptions : {}
  );
  const [hourOvr, setHourOvr] = useState<Record<string, number>>(
    saved && saved.hourOverrides ? saved.hourOverrides : {}
  );
  const [lastSaved, setLastSaved] = useState<string | null>(saved && saved.savedAt ? saved.savedAt : null);

  _hourOverrides = hourOvr;

  useEffect(() => {
    saveState({ entries: data, rateHistory: rh, exceptions, hourOverrides: hourOvr, savedAt: new Date().toISOString() });
    setLastSaved(new Date().toLocaleTimeString());
  }, [data, rh, exceptions, hourOvr]);

  useEffect(() => {
    setFxLoading(true);
    fetch(FX_API)
      .then((r) => r.json())
      .then((j) => {
        if (j.rates && j.rates.EGP) setFx(j.rates.EGP);
        setFxLoading(false);
      })
      .catch(() => {
        setFx(50.0);
        setFxLoading(false);
      });
  }, []);

  const syncing = useRef<boolean>(false);

  function syncVitalis() {
    if (syncing.current) return;
    syncing.current = true;
    setSyncMsg("Syncing...");
    fetch(VITALIS + "?days=90", { headers: { "x-api-key": VITALIS_KEY } })
      .then((r) => r.json())
      .then((j) => {
        syncing.current = false;
        if (j.error) {
          setSyncMsg("Error: " + j.error);
          return;
        }
        const seen: Record<string, boolean> = {};
        const newEntries = (j.entries || [])
          .filter((e: any) => {
            const key = (e.user && e.user.email || "") + "_" + e.logged_at + "_" + e.duration_minutes;
            if (seen[key]) return false;
            seen[key] = true;
            return true;
          })
          .map((e: any, i: number) => {
            const d = new Date(e.logged_at || e.started_at);
            const hrs = Math.round((e.duration_minutes / 60) * 100) / 100;
            const rawName = (e.user && e.user.name) || (e.user && e.user.email) || "Unknown";
            const nameMap: Record<string, string> = {
              "Aml Hamdy": "Amal Hamdy",
              Aml: "Amal Hamdy",
              "aml hamdy": "Amal Hamdy",
              Amal: "Amal Hamdy",
              "Bahaa Lashin": "Bahaa Mohamed",
              "bahaa lashin": "Bahaa Mohamed",
              Bahaa: "Bahaa Mohamed"
            };
            const nm = nameMap[rawName] || rawName;
            const mem = team.find((t) => t.name === nm || t.name.toLowerCase() === nm.toLowerCase());
            const rate = mem ? mem.rate : 0;
            return {
              id: 10000 + i,
              y: d.getFullYear(),
              m: d.getMonth() + 1,
              mn: MN[d.getMonth() + 1],
              name: nm,
              type: mem ? mem.type[0] : "H",
              rate: rate,
              hrs: hrs,
              amt: mem && mem.salary > 0 ? mem.salary : rate * hrs,
              st: "V",
              src: "vitalis"
            };
          });
        setData((prev) => {
          const manual = prev.filter((e) => e.src !== "vitalis");
          return manual.concat(newEntries);
        });
        setSyncMsg(newEntries.length + " entries synced");
        setTimeout(() => setSyncMsg(""), 5000);
      })
      .catch((err) => {
        syncing.current = false;
        setSyncMsg("Failed: " + err.message);
      });
  }

  if (!logged)
    return <Login onLogin={() => setLogged(true)} />;

  const tabs = ["dashboard", "payments", "hours", "rates", "time-log", "team", "scenarios"];
  const tabLabels: Record<string, string> = {
    dashboard: "Dashboard",
    payments: "Payments",
    hours: "Hours Target",
    rates: "Rates",
    "time-log": "Time Log",
    team: "Team",
    scenarios: "Scenarios"
  };

  return (
    <div className="min-h-screen">
      <div className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold">Rishca OS — Budget Manager</h1>
              <div className="text-slate-400 text-sm">
                {fxLoading ? "Loading FX rate..." : fx > 0 ? `1 USD = ${fx.toFixed(2)} EGP (live)` : "FX rate unavailable"}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={syncVitalis}
                className="bg-teal-700 hover:bg-teal-600 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                ⟳ Sync Vitalis
              </button>
              {syncMsg && (
                <span
                  className={`text-xs ${syncMsg.indexOf("Error") >= 0 || syncMsg.indexOf("Failed") >= 0 ? "text-red-400" : "text-teal-300"}`}
                  style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "inline-block" }}
                >
                  {syncMsg.length > 80 ? syncMsg.substring(0, 80) + "..." : syncMsg}
                </span>
              )}
              {lastSaved && <span className="text-xs text-slate-500">Saved {lastSaved}</span>}
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Reset all data to defaults? This clears synced Vitalis entries, payment statuses, rate changes, and exceptions."
                    )
                  ) {
                    localStorage.removeItem(STORE_KEY);
                    setData(entries);
                    setRH({ ...rateHistory });
                    setExceptions({});
                    setHourOvr({});
                    setSyncMsg("Data reset to defaults");
                    setTimeout(() => setSyncMsg(""), 3000);
                  }
                }}
                className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded-lg text-xs transition"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setLogged(false);
                  setTab("dashboard");
                }}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="flex gap-1 border-t border-slate-700 pt-3 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  "px-4 py-2 rounded-t-lg font-medium text-sm transition whitespace-nowrap " +
                  (tab === t ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700")
                }
              >
                {tabLabels[t]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {tab === "dashboard" && <DashTab data={data} fx={fx} />}
        {tab === "payments" && <PayTab data={data} setData={setData} fx={fx} exceptions={[exceptions, setExceptions]} />}
        {tab === "hours" && <HoursTab data={data} hourOvr={hourOvr} setHourOvr={setHourOvr} />}
        {tab === "rates" && <RatesTab rateHistory={rh} setRateHistory={setRH} />}
        {tab === "time-log" && <LogTab data={data} setData={setData} />}
        {tab === "team" && <TeamTab data={data} />}
        {tab === "scenarios" && <ScenTab />}
      </div>
    </div>
  );
};

export default App;
