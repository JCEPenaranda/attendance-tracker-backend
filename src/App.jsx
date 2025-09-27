import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Space,
  Typography,
  message,
  Form,
  Input,
  DatePicker,
  Modal,
  Tag,
  Select,
} from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const { Title } = Typography;
const { Option } = Select;

// Base API URL - set REACT_APP_API_URL in your environment for deployed backend
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// helper to ensure ids for members (local fallback)
const ensureMemberId = (m) =>
  m.id ? m : { ...m, id: `${Date.now()}-${Math.random()}` };

export default function App() {
  // ----- Dummy groups with full member info (kept as fallback) -----
  // const [groups, setGroups] = useState([
  //   {
  //     id: 1,
  //     name: "Jace",
  //     code: "11111",
  //     members: [
  //       {
  //         id: "m-1",
  //         fullName: "Alice",
  //         nickname: "Ali",
  //         contact: "0917-111-1111",
  //         address: "123 Mango St.",
  //         invitedBy: "Jace",
  //         notes: "Prefers morning check-ins.",
  //         one2one: 4,
  //       },
  //       {
  //         id: "m-2",
  //         fullName: "Bob",
  //         nickname: "Bobby",
  //         contact: "0917-222-2222",
  //         address: "45 Pine Ave.",
  //         invitedBy: "Jace",
  //         notes: "",
  //         one2one: 3,
  //       },
  //       {
  //         id: "m-3",
  //         fullName: "Charlie",
  //         nickname: "Char",
  //         contact: "0917-333-3333",
  //         address: "7 Oak Lane",
  //         invitedBy: "Jace",
  //         notes: "Needs follow-up re: schedule.",
  //         one2one: 5,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Josh",
  //     code: "22222",
  //     members: [
  //       {
  //         id: "m-4",
  //         fullName: "David",
  //         nickname: "Dave",
  //         contact: "0917-444-4444",
  //         address: "10 River Rd.",
  //         invitedBy: "Josh",
  //         notes: "",
  //         one2one: 6,
  //       },
  //       {
  //         id: "m-5",
  //         fullName: "Eve",
  //         nickname: "Evie",
  //         contact: "0917-555-5555",
  //         address: "88 Hill St.",
  //         invitedBy: "Josh",
  //         notes: "On vacation next week.",
  //         one2one: 4,
  //       },
  //       {
  //         id: "m-6",
  //         fullName: "Frank",
  //         nickname: "Franky",
  //         contact: "0917-666-6666",
  //         address: "300 Bay Blvd.",
  //         invitedBy: "Josh",
  //         notes: "",
  //         one2one: 2,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Tim",
  //     code: "33333",
  //     members: [
  //       {
  //         id: "m-7",
  //         fullName: "Grace",
  //         nickname: "Grace",
  //         contact: "0917-777-7777",
  //         address: "21 Center St.",
  //         invitedBy: "Tim",
  //         notes: "",
  //         one2one: 5,
  //       },
  //       {
  //         id: "m-8",
  //         fullName: "Heidi",
  //         nickname: "Hei",
  //         contact: "0917-888-8888",
  //         address: "14 Market Rd.",
  //         invitedBy: "Tim",
  //         notes: "",
  //         one2one: 3,
  //       },
  //       {
  //         id: "m-9",
  //         fullName: "Ivan",
  //         nickname: "Ivy",
  //         contact: "0917-999-9999",
  //         address: "5 Lake Ave.",
  //         invitedBy: "Tim",
  //         notes: "",
  //         one2one: 4,
  //       },
  //       {
  //         id: "m-10",
  //         fullName: "Judy",
  //         nickname: "Jude",
  //         contact: "0917-000-0000",
  //         address: "2 Sunset Blvd.",
  //         invitedBy: "Tim",
  //         notes: "",
  //         one2one: 6,
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Evan",
  //     code: "44444",
  //     members: [
  //       {
  //         id: "m-11",
  //         fullName: "Karl",
  //         nickname: "K",
  //         contact: "0918-111-1111",
  //         address: "9 Forest Rd.",
  //         invitedBy: "Evan",
  //         notes: "",
  //         one2one: 2,
  //       },
  //       {
  //         id: "m-12",
  //         fullName: "Liam",
  //         nickname: "Lee",
  //         contact: "0918-222-2222",
  //         address: "12 Palm St.",
  //         invitedBy: "Evan",
  //         notes: "",
  //         one2one: 3,
  //       },
  //       {
  //         id: "m-13",
  //         fullName: "Mia",
  //         nickname: "M",
  //         contact: "0918-333-3333",
  //         address: "33 Harbor Ln.",
  //         invitedBy: "Evan",
  //         notes: "Has mobility concerns.",
  //         one2one: 7,
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "Isaac",
  //     code: "55555",
  //     members: [
  //       {
  //         id: "m-14",
  //         fullName: "Nina",
  //         nickname: "Nin",
  //         contact: "0918-444-4444",
  //         address: "77 Orchard Rd.",
  //         invitedBy: "Isaac",
  //         notes: "",
  //         one2one: 6,
  //       },
  //       {
  //         id: "m-15",
  //         fullName: "Oscar",
  //         nickname: "Oz",
  //         contact: "0918-555-5555",
  //         address: "8 Ridge St.",
  //         invitedBy: "Isaac",
  //         notes: "",
  //         one2one: 5,
  //       },
  //       {
  //         id: "m-16",
  //         fullName: "Paul",
  //         nickname: "Pauly",
  //         contact: "0918-666-6666",
  //         address: "101 Elm St.",
  //         invitedBy: "Isaac",
  //         notes: "",
  //         one2one: 4,
  //       },
  //       {
  //         id: "m-17",
  //         fullName: "Quinn",
  //         nickname: "Q",
  //         contact: "0918-777-7777",
  //         address: "200 Cedar Ln.",
  //         invitedBy: "Isaac",
  //         notes: "",
  //         one2one: 3,
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: "John",
  //     code: "66666",
  //     members: [
  //       {
  //         id: "m-18",
  //         fullName: "New Member",
  //         nickname: "Newbie",
  //         contact: "0918-888-8888",
  //         address: "1 New St.",
  //         invitedBy: "Leader",
  //         notes: "",
  //         one2one: 4,
  //       },
  //       {
  //         id: "m-19",
  //         fullName: "Another Member",
  //         nickname: "Another",
  //         contact: "0918-999-9999",
  //         address: "2 Another St.",
  //         invitedBy: "Leader",
  //         notes: "",
  //         one2one: 5,
  //       },
  //     ],
  //   },
  // ]);

  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);

  // UI state
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [unlockingGroup, setUnlockingGroup] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // chart filter
  const [filter, setFilter] = useState("monthly"); // annual | monthly | weekly
  const [chartGroupFilter, setChartGroupFilter] = useState("all"); // "all" or a group id

  const categories = ["Present", "Absent", "Late"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "green";
      case "Absent":
        return "red";
      case "Late":
        return "orange";
      default:
        return "default";
    }
  };

  const COLORS = {
    Present: "green",
    Absent: "red",
    Late: "orange",
  };

  // ----------- Load groups & events from backend if available ----------
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [gRes, eRes] = await Promise.all([
          fetch(`${API_URL}/groups`),
          fetch(`${API_URL}/events`),
        ]);

        if (!gRes.ok || !eRes.ok) throw new Error("Fetch failed");

        const [gData, eData] = await Promise.all([gRes.json(), eRes.json()]);

        // ensure member ids exist
        const normalizedGroups = gData.map((g) => ({
          ...g,
          members: (g.members || []).map(ensureMemberId),
        }));

        if (mounted) {
          setGroups(normalizedGroups);
          setEvents(Array.isArray(eData) && eData.length ? eData : events);
          // if (normalizedGroups.length > 0)
          //   setSelectedGroup(normalizedGroups[0]);
        }
      } catch (err) {
        // Backend not available — keep local dummy data
        if (mounted) {
          // keep existing groups/events (already in state)
          if (!selectedGroup && groups.length > 0) setSelectedGroup(groups[0]);
        }
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Helper: sync groups state & selectedGroup ----------
  const applyGroupsUpdate = (newGroups) => {
    setGroups(newGroups);
    const newSelected =
      newGroups.find((g) => selectedGroup?.id === g.id) || newGroups[0] || null;
    setSelectedGroup(newSelected);
  };

  // ---------- Create Group (POST /groups) ----------
  const handleCreateGroup = async (values) => {
    const localNew = {
      id: groups.length + 1,
      name: values.groupName,
      code: values.groupCode,
      members: [],
    };

    try {
      const res = await fetch(`${API_URL}/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.groupName,
          code: values.groupCode,
        }),
      });
      if (!res.ok) throw new Error("Network error");
      const created = await res.json();
      // ensure members present
      created.members = (created.members || []).map(ensureMemberId);
      const newGroups = [...groups, created];
      applyGroupsUpdate(newGroups);
      message.success(`Group "${created.name}" created`);
    } catch (err) {
      // fallback local
      const newGroups = [...groups, localNew];
      applyGroupsUpdate(newGroups);
      message.success(`Group "${localNew.name}" created (local)`);
    }
  };
  // ---------- Delete Group (DELETE /groups/:id) ----------
  const handleDeleteGroup = async (groupId) => {
    // Modal.confirm({
    //   title: "Are you sure?",
    //   content:
    //     "Deleting this group will also remove all its members and events.",
    //   okText: "Yes, delete",
    //   okType: "danger",
    //   cancelText: "Cancel",
    //   onOk: async () => {
    try {
      const res = await fetch(`${API_URL}/groups/${groupId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Network error");

      // remove group locally
      const newGroups = groups.filter((g) => g.id !== groupId);
      applyGroupsUpdate(newGroups);

      // remove related events locally
      setEvents((prev) => prev.filter((e) => e.groupId !== groupId));

      message.success("Group and its events deleted");
    } catch (err) {
      // fallback local
      const newGroups = groups.filter((g) => g.id !== groupId);
      applyGroupsUpdate(newGroups);

      setEvents((prev) => prev.filter((e) => e.groupId !== groupId));

      message.success("Group and its events deleted (local only)");
    }
    // },
    // });
  };

  // ---------- Add Member (POST /groups/:id/members) ----------
  const handleAddMember = async (values) => {
    if (!selectedGroup) {
      message.warning("Please select a group first");
      return;
    }

    const memberPayload = {
      fullName: values.fullName || "",
      nickname: values.nickname || "",
      contact: values.contact || "",
      address: values.address || "",
      invitedBy: values.invitedBy || "",
      notes: values.notes || "",
      one2one: 1,
    };

    try {
      const res = await fetch(`${API_URL}/groups/${selectedGroup.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberPayload),
      });
      if (!res.ok) throw new Error("Network error");
      const created = await res.json();
      created.id = created.id || `${Date.now()}-${Math.random()}`;

      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? { ...g, members: [...g.members, created] }
          : g
      );
      applyGroupsUpdate(newGroups);
      message.success(`Member "${created.fullName || created.nickname}" added`);
    } catch (err) {
      // fallback local
      const newMember = { ...ensureMemberId(memberPayload) };
      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? { ...g, members: [...g.members, newMember] }
          : g
      );
      applyGroupsUpdate(newGroups);
      message.success(
        `Member "${newMember.fullName || newMember.nickname}" added (local)`
      );
    }
  };
  // ---------- Delete Member (DELETE /groups/:gid/members/:mid) ----------
  const handleDeleteMember = async (memberId) => {
    if (!selectedGroup) return;

    try {
      const res = await fetch(
        `${API_URL}/groups/${selectedGroup.id}/members/${memberId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Network error");

      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? { ...g, members: g.members.filter((m) => m.id !== memberId) }
          : g
      );
      applyGroupsUpdate(newGroups);
      message.success("Member deleted");
    } catch (err) {
      // fallback local
      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? { ...g, members: g.members.filter((m) => m.id !== memberId) }
          : g
      );
      applyGroupsUpdate(newGroups);
      message.success("Member deleted (local)");
    }
  };

  // ---------- Edit Member (PUT /groups/:gid/members/:mid) ----------
  const handleEditMember = async (values) => {
    if (!editingMember || !selectedGroup) return;

    try {
      const res = await fetch(
        `${API_URL}/groups/${selectedGroup.id}/members/${editingMember.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) throw new Error("Network error");
      const updated = await res.json();

      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? {
              ...g,
              members: g.members.map((m) =>
                m.id === editingMember.id ? updated : m
              ),
            }
          : g
      );
      applyGroupsUpdate(newGroups);
      setEditingMember(null);
      message.success("Member updated");
    } catch (err) {
      // fallback local update
      const newGroups = groups.map((g) =>
        g.id === selectedGroup.id
          ? {
              ...g,
              members: g.members.map((m) =>
                m.id === editingMember.id ? { ...m, ...values } : m
              ),
            }
          : g
      );
      applyGroupsUpdate(newGroups);
      setEditingMember(null);
      message.success("Member updated (local)");
    }
  };

  // ---------- Create Event (POST /events) ----------
  const createEvent = async () => {
    if (!selectedGroup) {
      message.warning("Please select a group first");
      return;
    }

    const payload = {
      groupId: selectedGroup.id,
      name: `Event ${events.length + 1}`,
      date: dayjs().format("MM/DD/YYYY"),
      attendance: selectedGroup.members.map((m) => ({
        name: m.nickname || m.fullName || "Unnamed",
        status: "Absent",
      })),
    };

    try {
      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network error");
      const created = await res.json();
      setEvents((prev) => [...prev, created]);
      message.success("Event created");
    } catch (err) {
      // local fallback
      const newEvent = { id: events.length + 1, ...payload };
      setEvents((prev) => [...prev, newEvent]);
      message.success("Event created (local)");
    }
  };

  // ---------- Toggle attendance (update event locally or via backend PUT) ----------
  const toggleAttendance = async (eventId, memberName) => {
    // update locally first
    const updatedEventsLocal = events.map((ev) =>
      ev.id !== eventId
        ? ev
        : {
            ...ev,
            attendance: ev.attendance.map((a) =>
              a.name !== memberName
                ? a
                : {
                    ...a,
                    status:
                      categories[
                        (categories.indexOf(a.status) + 1) % categories.length
                      ],
                  }
            ),
          }
    );

    setEvents(updatedEventsLocal);

    // try backend update
    try {
      await fetch(`${API_URL}/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEventsLocal.find((e) => e.id === eventId)),
      });
    } catch (err) {
      // ignore - local fallback retained
    }
  };

  // ---------- Edit Event ----------
  const handleEditEvent = async (values) => {
    const updatedEvent = {
      ...selectedEvent,
      name: values.name,
      date: values.date.format("MM/DD/YYYY"),
      attendance: selectedEvent.attendance, // preserve attendance
    };

    try {
      const res = await fetch(`${API_URL}/events/${selectedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      if (!res.ok) throw new Error("Network error");
      const returned = await res.json();
      setEvents((prev) =>
        prev.map((e) => (e.id === returned.id ? returned : e))
      );
      message.success("Event updated!");
      setSelectedEventId(null);
    } catch (err) {
      // fallback local
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      message.success("Event updated (local)!");
      setSelectedEventId(null);
    }
  };
  // ---------- Delete Event (DELETE /events/:id) ----------
  const handleDeleteEvent = async (eventId) => {
    try {
      const res = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Network error");

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      message.success("Event deleted");
    } catch (err) {
      // fallback local
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      message.success("Event deleted (local)");
    }
  };

  // ---------- Event attendance summary ----------
  const getEventSummary = (attendance) => {
    const counts = { Present: 0, Absent: 0, Late: 0 };
    attendance.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  };

  // ---------- Pie summary data ----------
  const getPieSummaryData = () => {
    let filteredEvents = events;

    if (chartGroupFilter !== "all") {
      const gid = Number(chartGroupFilter);
      filteredEvents = filteredEvents.filter((e) => e.groupId === gid);
    }

    const counts = { Present: 0, Absent: 0, Late: 0 };

    filteredEvents.forEach((ev) => {
      ev.attendance.forEach((a) => {
        counts[a.status] = (counts[a.status] || 0) + 1;
      });
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  };

  // ---------- Summary per group ----------
  const getGroupSummaryData = () => {
    let filteredEvents = events;

    if (chartGroupFilter !== "all") {
      const gid = Number(chartGroupFilter);
      filteredEvents = filteredEvents.filter((e) => e.groupId === gid);
    }

    const summaries = groups.map((g) => ({
      groupName: g.name,
      Present: 0,
      Absent: 0,
      Late: 0,
    }));

    filteredEvents.forEach((ev) => {
      const groupName = groups.find((g) => g.id === ev.groupId)?.name;
      const groupSummary = summaries.find((s) => s.groupName === groupName);
      if (groupSummary) {
        ev.attendance.forEach((a) => {
          groupSummary[a.status] += 1;
        });
      }
    });

    return summaries;
  };

  const selectedEvent = events.find((ev) => ev.id === selectedEventId) || null;
  const pieData = getPieSummaryData();
  const groupSummary = getGroupSummaryData();

  return (
    <div style={{ padding: 24, maxWidth: 950, margin: "0 auto" }}>
      {/* <Title level={2}>Attendance Manager</Title> */}

      {/* Create Group */}
      <Card
        title="Create Group"
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Form
          layout="inline"
          onFinish={handleCreateGroup}
          style={{
            gap: 16,
            display: "flex",
            flexWrap: "wrap",
            marginRight: 32,
          }}
        >
          <Form.Item
            name="groupName"
            rules={[{ required: true, message: "Please input group name!" }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
          <Form.Item
            name="groupCode"
            rules={[
              { required: true, message: "Please input 5-digit code!" },
              { len: 5, message: "Code must be exactly 5 digits" },
            ]}
          >
            <Input placeholder="5-digit code" maxLength={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Group
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Groups */}
      <Card title="Groups" style={{ marginBottom: 16 }}>
        <div style={{ maxHeight: 150, overflowY: "auto", padding: 8 }}>
          <Space>
            {groups.map((g) => (
              <div
                key={g.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                  gap: 8,
                }}
              >
                <Button
                  type={selectedGroup?.id === g.id ? "primary" : "default"}
                  onClick={() => setUnlockingGroup(g)}
                >
                  {g.name}
                </Button>
                {/* <Button
                  danger
                  size="small"
                  onClick={() => handleDeleteGroup(g.id)}
                >
                  Delete
                </Button> */}
              </div>
            ))}
          </Space>
        </div>
      </Card>

      {/* Attendance Chart */}
      {events.length > 0 && (
        <Card
          title="Attendance Statistics"
          style={{ marginBottom: 16 }}
          extra={
            <Space>
              <Select
                value={chartGroupFilter}
                onChange={(val) => setChartGroupFilter(val)}
                style={{ width: 150 }}
              >
                <Option value="all">All Groups</Option>
                {groups.map((g) => (
                  <Option key={g.id} value={g.id}>
                    {g.name}
                  </Option>
                ))}
              </Select>
              {/* <Select
                value={filter}
                onChange={(val) => setFilter(val)}
                style={{ width: 120 }}
              >
                <Option value="annual">Annual</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="weekly">Weekly</Option>
              </Select> */}
            </Space>
          }
        >
          {/* Single Pie Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Group Summary Table */}
          <Table
            style={{ marginTop: 16 }}
            dataSource={groupSummary}
            rowKey="groupName"
            pagination={false}
            columns={[
              { title: "Group", dataIndex: "groupName", width: "30%" },
              { title: "Present", dataIndex: "Present", width: "20%" },
              { title: "Absent", dataIndex: "Absent", width: "20%" },
              { title: "Late", dataIndex: "Late", width: "20%" },
            ]}
          />
        </Card>
      )}

      {/* Member Creation */}
      {selectedGroup && (
        <Card
          title={`Add Member to ${selectedGroup.name}`}
          style={{ marginBottom: 16 }}
        >
          <Form layout="vertical" onFinish={handleAddMember}>
            <Form.Item name="fullName" label="Full Name">
              <Input placeholder="Full name (Optional)" />
            </Form.Item>
            <Form.Item
              name="nickname"
              rules={[{ required: true, message: "Please input nickname!" }]}
              label="Nickname"
            >
              <Input placeholder="Nickname" />
            </Form.Item>
            <Form.Item name="contact" label="Contact Number">
              <Input placeholder="Contact number (optional)" />
            </Form.Item>
            <Form.Item name="address" label="Current Address">
              <Input placeholder="Current address (optional)" />
            </Form.Item>
            <Form.Item name="invitedBy" label="Invited By">
              <Input placeholder="Invited by (optional)" />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea rows={2} placeholder="Notes for leader" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Member
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      {/* Members */}
      {selectedGroup && (
        <Card
          title={`Members of ${selectedGroup.name}`}
          style={{ marginBottom: 16 }}
        >
          <div style={{ maxHeight: 260, overflowY: "auto" }}>
            {selectedGroup.members.length > 0 ? (
              <Table
                dataSource={selectedGroup.members}
                rowKey="id"
                pagination={false}
                columns={[
                  { title: "Nickname", dataIndex: "nickname", width: "20%" },
                  {
                    title: "One2One",
                    dataIndex: "one2one",
                    width: "40%",
                    render: (value, record) => (
                      <Space>
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <Button
                            key={num}
                            size="medium"
                            type={
                              num === record.one2one ? "primary" : "default"
                            }
                            onClick={async () => {
                              // update local UI immediately
                              const newGroups = groups.map((g) =>
                                g.id === selectedGroup.id
                                  ? {
                                      ...g,
                                      members: g.members.map((m) =>
                                        m.id === record.id
                                          ? { ...m, one2one: num }
                                          : m
                                      ),
                                    }
                                  : g
                              );
                              applyGroupsUpdate(newGroups);

                              // try backend PUT
                              try {
                                await fetch(
                                  `${API_URL}/groups/${selectedGroup.id}/members/${record.id}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      ...record,
                                      one2one: num,
                                    }),
                                  }
                                );
                              } catch (err) {
                                // ignore - local update preserved
                              }
                            }}
                          >
                            {num}
                          </Button>
                        ))}
                      </Space>
                    ),
                  },
                  {
                    title: "Actions",
                    render: (_, record) => (
                      <Space>
                        <Button
                          type="link"
                          onClick={() => setEditingMember(record)}
                        >
                          View
                        </Button>
                        <Button
                          type="link"
                          danger
                          onClick={() => handleDeleteMember(record.id)}
                        >
                          Delete
                        </Button>
                      </Space>
                    ),
                  },
                ]}
              />
            ) : (
              <p>No members yet. Add some above 👆</p>
            )}
          </div>
        </Card>
      )}

      {/* Events */}
      {selectedGroup && (
        <Card
          title={`Events for ${selectedGroup.name}`}
          extra={
            <Button type="primary" onClick={createEvent}>
              + New Event
            </Button>
          }
        >
          <div style={{ maxHeight: 360, overflowY: "auto" }}>
            {events
              .filter((e) => e.groupId === selectedGroup.id)
              .sort((a, b) => b.id - a.id)
              .map((ev) => {
                const summary = getEventSummary(ev.attendance);
                return (
                  <Card
                    key={ev.id}
                    type="inner"
                    title={ev.name}
                    extra={
                      <Space>
                        <span>{ev.date}</span>
                        <Button
                          danger
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent opening modal
                            handleDeleteEvent(ev.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Space>
                    }
                    style={{ marginBottom: 16, cursor: "pointer" }}
                    onClick={() => setSelectedEventId(ev.id)}
                  >
                    <Space>
                      <Tag color="green">Present: {summary.Present}</Tag>
                      <Tag color="red">Absent: {summary.Absent}</Tag>
                      <Tag color="orange">Late: {summary.Late}</Tag>
                    </Space>
                  </Card>
                );
              })}
          </div>
        </Card>
      )}

      {/* Event Modal */}
      <Modal
        title={selectedEvent?.name}
        open={!!selectedEvent}
        onCancel={() => setSelectedEventId(null)}
        footer={null}
        width={650}
      >
        {selectedEvent && (
          <>
            <Form
              layout="inline"
              initialValues={{
                name: selectedEvent.name,
                date: dayjs(selectedEvent.date, "MM/DD/YYYY"),
              }}
              onFinish={handleEditEvent}
              style={{ marginBottom: 16 }}
            >
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input event name!" },
                ]}
              >
                <Input placeholder="Event name" />
              </Form.Item>
              <Form.Item
                name="date"
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <DatePicker format="MM/DD/YYYY" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>

            <Table
              dataSource={selectedEvent.attendance}
              rowKey="name"
              pagination={false}
              columns={[
                { title: "Member", dataIndex: "name", width: "40%" },
                {
                  title: "Status",
                  dataIndex: "status",
                  width: "60%",
                  render: (status, record) => (
                    <Tag
                      color={getStatusColor(status)}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        toggleAttendance(selectedEvent.id, record.name)
                      }
                    >
                      {status}
                    </Tag>
                  ),
                },
              ]}
            />
          </>
        )}
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        title="Edit Member"
        open={!!editingMember}
        onCancel={() => {
          setEditingMember(null);
          setEditMode(false);
        }}
        footer={null}
      >
        {editingMember && (
          <Form
            layout="vertical"
            initialValues={editingMember}
            onFinish={handleEditMember}
          >
            <Form.Item name="fullName" label="Full Name">
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              rules={[{ required: true }]}
              label="Nickname"
            >
              <Input />
            </Form.Item>
            <Form.Item name="contact" label="Contact Number">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Current Address">
              <Input />
            </Form.Item>
            <Form.Item name="invitedBy" label="Invited By">
              <Input />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Unlock Modal */}
      <Modal
        title={`Enter code for ${unlockingGroup?.name}`}
        open={!!unlockingGroup}
        onCancel={() => setUnlockingGroup(null)}
        footer={null}
      >
        <Form
          onFinish={(values) => {
            if (values.code === unlockingGroup.code) {
              setSelectedGroup(unlockingGroup);
              setUnlockingGroup(null);
              message.success("Group unlocked!");
            } else {
              message.error("Incorrect code");
            }
          }}
        >
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "Please enter the 5-digit code" },
              { len: 5, message: "Code must be exactly 5 digits" },
            ]}
          >
            <Input.Password placeholder="5-digit code" maxLength={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Unlock
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
