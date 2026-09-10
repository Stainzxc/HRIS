import React from 'react'
import PreviewStat from './PreviewStat'
import Icon from './Icon'

function WorkspacePreview() {
  const people = [
      {
          initials: "AL",
          name: "Alex Lee",
          department: "Design",
          avatarClass: "bg-[#f5e2d6]",
      },
      {
          initials: "MS",
          name: "Morgan Santos",
          department: "Operations",
          avatarClass: "bg-[#ecdfef]",
      },
      {
          initials: "JR",
          name: "Jamie Reyes",
          department: "People & Culture",
          avatarClass: "bg-[#e3ebe0]",
      },
  ];

  return (
      <div className="relative min-w-0 px-2 pt-[22px] pb-10 max-[760px]:mx-auto max-[760px]:w-full max-[760px]:max-w-[480px]">
          {" "}
          {/* Background orbit */}
          <div
              aria-hidden="true"
              className="absolute inset-0 scale-[1.08] rotate-[-20deg] rounded-[50%] border border-[#dfd4e3] bg-[radial-gradient(ellipse,#e9dfeb_0%,#efe7ec80_50%,transparent_70%)] max-[440px]:-inset-x-2"
          />
          {/* Main preview */}
          <div
              role="img"
              aria-label="Illustrative HR workspace with employee profiles, department totals, and team distribution. All values are sample data."
              className="relative rotate-[-2deg] overflow-hidden rounded-[15px] border border-[#e7e0e8] bg-white shadow-[0_22px_60px_#52336312]"
          >
              {/* Top bar */}
              <div className="flex items-center justify-between gap-2 bg-[#5b3c78] px-5 py-4 text-[11px] text-[#f8f3fa] max-[440px]:p-[13px]">
                  <span className="flex items-center gap-[9px]">
                      <span className="grid size-[22px] place-items-center rounded-[7px] bg-[#f0cdb7] font-bold text-[#5b3c78]">
                          L
                      </span>
                      Your workspace
                  </span>

                  <span className="text-[7px] tracking-[0.12em] opacity-70">
                      SAMPLE PREVIEW
                  </span>
              </div>

              <div className="p-6 max-[1000px]:p-[17px] max-[440px]:p-[15px]">
                  {/* Greeting */}
                  <div className="flex items-center justify-between gap-[10px]">
                      <div>
                          <p className="text-[7px] tracking-[0.15em] text-[#9a819f]">
                              YOUR PEOPLE, AT A GLANCE
                          </p>

                          <h2 className="mt-1.5 text-[17px] font-semibold tracking-[-0.04em] max-[440px]:text-sm">
                              A little clarity. A better day.
                          </h2>
                      </div>

                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#ecdfef] text-[10px] text-[#5b3c78]">
                          JD
                      </span>
                  </div>

                  {/* Stats */}
                  <div className="my-6 grid grid-cols-3 gap-[10px] max-[440px]:gap-[7px]">
                      <PreviewStat
                          icon="people"
                          label="Employees"
                          value="128"
                          unit="people"
                      />

                      <PreviewStat
                          icon="grid"
                          label="Departments"
                          value="08"
                          unit="teams"
                      />

                      <PreviewStat
                          icon="briefcase"
                          label="Positions"
                          value="24"
                          unit="roles"
                      />
                  </div>

                  {/* Directory */}
                  <div>
                      <div className="flex items-center justify-between gap-2 pb-2">
                          <h3 className="text-xs font-semibold">
                              Meet your people
                          </h3>

                          <span className="text-[8px] text-[#99829f]">
                              Employee directory
                          </span>
                      </div>

                      {people.map((person) => (
                          <div
                              key={person.initials}
                              className="flex items-center gap-[10px] border-b border-[#f2edf2] py-[10px]"
                          >
                              <span
                                  className={`grid size-8 shrink-0 place-items-center rounded-full text-[10px] text-[#5b3c78] ${person.avatarClass}`}
                              >
                                  {person.initials}
                              </span>

                              <div>
                                  <strong className="block text-[10px] font-semibold">
                                      {person.name}
                                  </strong>

                                  <span className="mt-0.5 block text-[8px] text-[#7b737e]">
                                      {person.department}
                                  </span>
                              </div>

                              <span className="ml-auto rounded-full bg-[#edf3eb] px-2 py-[3px] text-[7px] text-[#668063]">
                                  Active
                              </span>
                          </div>
                      ))}
                  </div>

                  {/* Team distribution */}
                  <div className="mt-[18px] text-[9px] text-[#77647e]">
                      <span>A connected organization</span>

                      <div className="my-[10px] flex h-[7px] gap-1">
                          <i className="flex-[3] rounded-sm bg-[#806096]" />
                          <i className="flex-[4] rounded-sm bg-[#baa4c4]" />
                          <i className="flex-[3] rounded-sm bg-[#e8c7b6]" />
                          <i className="flex-[2] rounded-sm bg-[#dfe6dc]" />
                      </div>

                      <p className="flex justify-between text-[7px] text-[#928795]">
                          <span>Design</span>
                          <span>Operations</span>
                          <span>People & Culture</span>
                          <span>Other</span>
                      </p>
                  </div>
              </div>
          </div>
          {/* Floating note */}
          <div className="absolute right-0 bottom-0 flex rotate-2 items-center gap-3 rounded-xl border border-[#eaded6] bg-[#fffaf5] px-[22px] py-4 shadow-[0_10px_24px_#5233630b] max-[440px]:right-[-5px] max-[440px]:px-4 max-[440px]:py-3">
              <span className="grid size-[33px] place-items-center rounded-full bg-[#edddce] text-[#88634f]">
                  <Icon name="check" className="size-[18px]" />
              </span>

              <div>
                  <strong className="text-[11px] font-semibold">
                      Less admin. More human.
                  </strong>

                  <p className="mt-[3px] text-[9px] text-[#99887d]">
                      Make room for what matters.
                  </p>
              </div>
          </div>
      </div>
  );
}

export default WorkspacePreview