using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZuciQuizLibrary.Models;

namespace ZuciQuizLibrary.Services.Interfaces
{
    
    public interface IRoleService
    {
        Task<Role> GetRoleNameById(int roleId);
        Task<List<Role>> GetAllRole();
    }
}
